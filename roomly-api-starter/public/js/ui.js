// Gotowy widok — w tym bloku skupiasz się na danych i asynchroniczności.
const list = document.querySelector("#room-list");
const template = document.querySelector("#room-template");
const resultsSection = document.querySelector("#results-section");
const statusText = document.querySelector("#results-status");
const loadingHint = document.querySelector("#loading-hint");
const errorPanel = document.querySelector("#error-panel");
const errorMessage = document.querySelector("#error-message");
const emptyState = document.querySelector("#empty-state");
const searchButton = document.querySelector("#search-button");
const money = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });
let currentStatus = "idle";

function createRoomCard(room, index) {
  const fragment = template.content.cloneNode(true);
  const set = (field, value) => { fragment.querySelector(`[data-field="${field}"]`).textContent = value; };
  set("visual-number", String(index + 1).padStart(2, "0"));
  set("location", `${room.city} · ${room.district}`);
  set("title", room.title);
  set("capacity", `Do ${room.capacity} osób`);
  set("features", room.features.join(" · "));
  set("hourly-rate", money.format(room.hourlyRate));
  return fragment;
}

export function renderState({ status, rooms = [], message = "" }) {
  currentStatus = status;
  const isLoading = status === "loading";
  resultsSection.setAttribute("aria-busy", String(isLoading));
  searchButton.disabled = isLoading;
  searchButton.textContent = isLoading ? "Sprawdzanie…" : "Sprawdź sale ↗";
  list.replaceChildren();
  errorPanel.hidden = status !== "error";
  errorMessage.textContent = status === "error" ? message : "";
  emptyState.hidden = !(status === "success" && rooms.length === 0);
  loadingHint.hidden = true;
  loadingHint.textContent = "";

  if (status === "idle") statusText.textContent = "Wybierz kryteria i sprawdź sale.";
  if (status === "loading") statusText.textContent = "Sprawdzamy dostępne przestrzenie…";
  if (status === "error") statusText.textContent = "Wyszukiwanie zakończyło się błędem.";
  if (status === "success") {
    statusText.textContent = `Liczba znalezionych sal: ${rooms.length}`;
    rooms.forEach((room, index) => list.append(createRoomCard(room, index)));
  }
}

export function showLoadingHint(message) {
  if (currentStatus !== "loading") return;
  loadingHint.textContent = message;
  loadingHint.hidden = false;
}
