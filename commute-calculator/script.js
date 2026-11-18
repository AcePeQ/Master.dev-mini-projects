function init() {
  const commuteFormEl = document.querySelector("#commute-form");
  const summarySectionEl = document.querySelector("#summary-section");
  const montlyCostOutputEl = document.querySelector("#monthly-cost");
  const dailyCostOutputEl = document.querySelector("#daily-cost");

  function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formObject = normalizeFormData(formData);

    const totalMonthCost = calculateMonthCost(formObject.distance, formObject.average, formObject.price, formObject.days);
    const totalDailyCost = calculateDailyCost(formObject.distance, formObject.average, formObject.price);

    renderSummary(totalMonthCost, totalDailyCost);
  }

  function renderSummary(totalMonthCost, totalDailyCost) {
    const isSummaryHidden = summarySectionEl.hidden;

    if (isSummaryHidden) {
      summarySectionEl.hidden = false;
    }

    montlyCostOutputEl.textContent = `${totalMonthCost.toFixed(2)} zł`;
    dailyCostOutputEl.textContent = `${totalDailyCost.toFixed(2)} zł`
  }

  function calculateMonthCost(distance, average, price, days) {
    return (2 * distance * days * average * price) / 100
  }

  function calculateDailyCost(distance, average, price) {
    return (2 * distance * average * price) / 100
  }

  function normalizeFormData(formData) {
    const entries = [...formData.entries()];
    const numericEntries = entries.map((convertStringValuesToNumberic));
    return Object.fromEntries(numericEntries);
  }

  function convertStringValuesToNumberic(entry) {
    const [key, value] = entry;
    return [key, Number(value)];
  }

  commuteFormEl.addEventListener("submit", handleFormSubmit)
}

init();