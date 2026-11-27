// Gotowy formularz i renderowanie. Tu połączysz własne moduły.
import { renderState, showLoadingHint } from "./ui.js";
// TODO: zaimportuj funkcje z api.js i normalize.js.

const searchForm = document.querySelector("#search-form");

async function loadRooms(criteria) {
  // TODO: loading → timer → pobranie → normalizacja → wynik albo błąd.
  // Sprzątanie timera ma nastąpić niezależnie od wyniku operacji.
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const { city, people, scenario } = Object.fromEntries(new FormData(event.currentTarget));
  loadRooms({ city, people: Number(people), scenario });
});

renderState({ status: "idle" });
