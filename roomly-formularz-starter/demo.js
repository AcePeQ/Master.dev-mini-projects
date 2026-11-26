// Gotowa obsługa demonstracji. Nic nie jest wysyłane do serwera.
// Natywna walidacja przeglądarki nadal działa przed zdarzeniem submit.
const bookingForm = document.querySelector("#booking-form");
const demoNotice = document.querySelector("#demo-notice");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  demoNotice.hidden = false;
  demoNotice.focus();
});

bookingForm.addEventListener("reset", () => {
  demoNotice.hidden = true;
});
