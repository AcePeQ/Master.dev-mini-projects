function init() {
  const savedRecords = []
  let currentRecord;
  let totalMonthCost;
  let totalDailyCost;

  const commuteFormEl = document.querySelector("#commute-form");
  const saveRecordFormEl = document.querySelector("#record-form");
  const summarySectionEl = document.querySelector("#summary-section");
  const montlyCostOutputEl = document.querySelector("#monthly-cost");
  const dailyCostOutputEl = document.querySelector("#daily-cost");

  function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formObject = normalizeFormData(formData);
    currentRecord = formObject;

    totalMonthCost = calculateMonthCost(formObject.distance, formObject.average, formObject.price, formObject.days);
    totalDailyCost = calculateDailyCost(formObject.distance, formObject.average, formObject.price);

    renderSummary(totalMonthCost, totalDailyCost);
  }

  function handleRecordSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());

    const newRecord = {
      name: formObject["record_name"],
      totalMonthCost,
      totalDailyCost,
      ...currentRecord
    }

    saveRecord(newRecord);

    renderRecords();
  }

  function renderRecords() {
    const recordsTableEl = document.querySelector("#records-table")

    recordsTableEl.textContent = "";

    savedRecords.forEach(record => {
      const recordEl = renderRecordRow(record);
      recordsTableEl.appendChild(recordEl)
    })
  }

  function renderRecordRow(record) {
    const tableRowEl = document.createElement("tr");
    const tableNameEl = document.createElement("th");
    tableNameEl.scope = "row";
    tableNameEl.textContent = record.name;

    const tableDistanceEl = document.createElement("td");
    tableDistanceEl.textContent = record.distance;

    const tableAverageEl = document.createElement("td");
    tableAverageEl.textContent = record.average;

    const tablePriceEl = document.createElement("td");
    tablePriceEl.textContent = record.price;

    const tableDaysEl = document.createElement("td");
    tableDaysEl.textContent = record.days;

    const tableTotalMonthCostEl = document.createElement("td");
    tableTotalMonthCostEl.textContent = `${record.totalMonthCost.toFixed(2)} zł`;

    const tableTotalDailyCostEl = document.createElement("td");
    tableTotalDailyCostEl.textContent = `${record.totalDailyCost.toFixed(2)} zł`;

    tableRowEl.append(
      tableNameEl,
      tableDistanceEl,
      tableAverageEl,
      tablePriceEl,
      tableDaysEl,
      tableTotalMonthCostEl,
      tableTotalDailyCostEl
    );

    return tableRowEl;
  }

  function saveRecord(recordData) {
    savedRecords.push(recordData);
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

  commuteFormEl.addEventListener("submit", handleFormSubmit);
  saveRecordFormEl.addEventListener("submit", handleRecordSubmit);
}

init();
