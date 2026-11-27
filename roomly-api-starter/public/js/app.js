// Gotowy formularz i renderowanie. Tu połączysz własne moduły.
import { renderState, showLoadingHint } from "./ui.js";
// TODO: zaimportuj funkcje z api.js i normalize.js.
import { fetchRooms } from "./api.js"
import { normalizeRooms } from "./normalize.js";

const searchForm = document.querySelector("#search-form");

async function loadRooms(criteria) {
  // TODO: loading → timer → pobranie → normalizacja → wynik albo błąd.
  // Sprzątanie timera ma nastąpić niezależnie od wyniku operacji.
  renderState({ status: "loading" });

  const timeoutId = setTimeout(() => {
    showLoadingHint("To chwilę potrwa...")
  }, 800)

  try {
    const rawRooms = await fetchRooms(criteria);
    const rooms = normalizeRooms(rawRooms);

    renderState({ status: "success", rooms });
  } catch (error) {
    renderState({ status: "error", message: error.message })
  } finally {
    clearTimeout(timeoutId);
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const { city, people, scenario } = Object.fromEntries(new FormData(event.currentTarget));
  loadRooms({ city, people: Number(people), scenario });
});

renderState({ status: "idle" });
