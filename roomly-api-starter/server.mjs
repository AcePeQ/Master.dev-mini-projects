// Gotowe lokalne API do ćwiczenia. Nie wymaga paczek npm.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, sep, extname } from "node:path";

const publicRoot = fileURLToPath(new URL("./public/", import.meta.url));
const rooms = JSON.parse(await readFile(new URL("./fixtures/rooms.json", import.meta.url), "utf8"));
const requestedPort = Number(process.env.PORT ?? process.argv[2] ?? 4173);
const mimeTypes = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8" };
const scenarios = new Set(["normal", "slow", "empty", "http-error", "bad-json", "network-error"]);
const delay = (milliseconds) => new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));

function sendJson(response, status, data) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  response.end(JSON.stringify(data));
}

async function handleApi(request, response, url) {
  const city = url.searchParams.get("city") ?? "warszawa";
  const people = Number(url.searchParams.get("people") ?? "1");
  const scenario = url.searchParams.get("scenario") ?? "normal";

  if (!["warszawa", "gdansk"].includes(city) || !Number.isInteger(people) || people < 1 || people > 20 || !scenarios.has(scenario)) {
    sendJson(response, 400, { message: "Niepoprawne parametry wyszukiwania." });
    return;
  }

  await delay(scenario === "slow" ? 1800 : 180);

  if (scenario === "network-error") {
    request.socket.destroy();
    return;
  }
  if (scenario === "http-error") {
    sendJson(response, 503, { message: "Usługa wyszukiwania jest chwilowo niedostępna." });
    return;
  }
  if (scenario === "bad-json") {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
    response.end('{"rooms":');
    return;
  }

  const foundRooms = scenario === "empty" ? [] : rooms.filter((room) => room.location.code === city && room.capacity >= people);
  sendJson(response, 200, { query: { city, people }, total: foundRooms.length, rooms: foundRooms });
}

async function handleRequest(request, response) {
  if (request.method !== "GET") {
    sendJson(response, 405, { message: "W tym ćwiczeniu API obsługuje tylko GET." });
    return;
  }
  const url = new URL(request.url, "http://localhost");
  if (url.pathname === "/api/rooms") {
    await handleApi(request, response, url);
    return;
  }
  if (url.pathname.startsWith("/api/")) {
    sendJson(response, 404, { message: "Nie ma takiego endpointu." });
    return;
  }
  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const target = resolve(publicRoot, `.${pathname}`);
  const rootPrefix = publicRoot.endsWith(sep) ? publicRoot : publicRoot + sep;
  if (!target.startsWith(rootPrefix)) {
    sendJson(response, 403, { message: "Brak dostępu." });
    return;
  }
  try {
    const contents = await readFile(target);
    response.writeHead(200, { "Content-Type": mimeTypes[extname(target)] ?? "application/octet-stream", "Cache-Control": "no-store" });
    response.end(contents);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EISDIR") {
      sendJson(response, 404, { message: "Nie ma takiego pliku." });
      return;
    }
    throw error;
  }
}

const server = createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    console.error(error.message);
    if (!response.headersSent) sendJson(response, 500, { message: "Błąd lokalnego serwera." });
    else response.destroy();
  });
});
server.on("error", (error) => { console.error(`Nie udało się uruchomić serwera: ${error.message}`); process.exitCode = 1; });
server.listen(requestedPort, "127.0.0.1", () => {
  console.log(`Roomly — otwórz http://127.0.0.1:${server.address().port}`);
});
