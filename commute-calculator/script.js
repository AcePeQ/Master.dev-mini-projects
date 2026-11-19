function init() {
  const savedRecords = []
  let currentRecord;
  let totalMonthCost;
  let totalDailyCost;
  let recordIndex = 0;

  const commuteFormEl = document.querySelector("#commute-form");
  const saveRecordFormEl = document.querySelector("#record-form");
  const summarySectionEl = document.querySelector("#summary-section");
  const montlyCostOutputEl = document.querySelector("#monthly-cost");
  const dailyCostOutputEl = document.querySelector("#daily-cost");
  const recordsTableEl = document.querySelector("#records-table")

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

    const isNameInputValid = validateNameInput(formObject["record_name"]);

    if (!isNameInputValid) return;

    const newRecord = {
      id: recordIndex,
      name: formObject["record_name"].trim(),
      totalMonthCost,
      totalDailyCost,
      ...currentRecord
    }

    saveRecord(newRecord);

    renderRecords();
  }

  function validateNameInput(value) {
    const recordNameInputEl = document.querySelector("#record-name");
    const recordNameErrorEl = document.querySelector("#record-name-error");

    const isValueValid = value.trim().length > 0;

    recordNameInputEl.ariaInvalid = isValueValid ? "false" : "true";
    recordNameErrorEl.textContent = isValueValid ? "" : "Enter valid name format!";
    recordNameErrorEl.classList.toggle("hidden", isValueValid)

    return isValueValid;
  }

  function renderRecords() {
    recordsTableEl.textContent = "";

    savedRecords.forEach(record => {
      const recordEl = renderRecordRow(record);
      recordsTableEl.appendChild(recordEl)
    })
  }

  function renderRecordRow(record) {
    const tableRowEl = document.createElement("tr");
    tableRowEl.dataset.recordId = record.id;

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

    const tableActionEl = document.createElement("td");

    const tableDeleteRowEl = document.createElement("button");
    tableDeleteRowEl.dataset.action = "delete";
    tableDeleteRowEl.textContent = "Usuń";
    tableDeleteRowEl.type = "button";
    tableDeleteRowEl.className = "btn-delete-record";
    tableDeleteRowEl.setAttribute(
      "aria-label",
      `Usuń wariant ${record.name}`
    );

    tableActionEl.append(tableDeleteRowEl);

    tableRowEl.append(
      tableNameEl,
      tableDistanceEl,
      tableAverageEl,
      tablePriceEl,
      tableDaysEl,
      tableTotalMonthCostEl,
      tableTotalDailyCostEl,
      tableActionEl,
    );

    return tableRowEl;
  }

  function saveRecord(recordData) {
    recordIndex++;
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

  function handleDeleteTableRow(event) {
    const target = event.target;
    const targetAction = target.dataset.action;

    console.log(target.tagName)
    console.log(targetAction)

    if (target.tagName !== "BUTTON" || targetAction !== "delete") return;

    const recordRow = target.closest("tr");
    const rowId = recordRow.dataset.recordId;

    if (!rowId) return;

    const itemArrayIndex = savedRecords.findIndex(record => record.id === Number(rowId));
    if (itemArrayIndex === -1) return;

    savedRecords.splice(itemArrayIndex, 1);

    renderRecords();
  }

  async function fetchRoutes() {
    const res = await fetch("./routes.json");

    if (!res.ok) {
      throw Error("Nie udało pobrać się tras.")
    }

    const data = await res.json();

    return data;
  }

  async function renderRoutes() {
    const selectRoutesEl = document.querySelector("#routes-select");
    const routesLoaderEl = document.querySelector("#routes-loader");
    const selectRoutesErrorEl = document.querySelector("#routes-error");

    let isLoading = true;
    let isError = false;

    try {
      handleWrapperStatus(isLoading, isError, selectRoutesEl, routesLoaderEl, selectRoutesErrorEl)
      const { routes } = await fetchRoutes();

      routes.forEach(route => {
        const routeOptionEl = renderRouteOption(route);
        selectRoutesEl.append(routeOptionEl)
      })
    } catch (error) {
      isError = true;
      console.error(error);
    } finally {
      isLoading = false;
      handleWrapperStatus(isLoading, isError, selectRoutesEl, routesLoaderEl, selectRoutesErrorEl)
    }
  }

  function handleWrapperStatus(isLoading, isError, selectEl, LoaderEl, errorEl) {
    if (isError && !isLoading) {
      selectEl.classList.add("hidden");
      LoaderEl.classList.add("hidden");

      errorEl.textContent = "Sorry! We couldn't render your routes!";
      errorEl.classList.remove("hidden");
    }

    if (!isError && isLoading) {
      selectEl.classList.add("hidden");
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
      LoaderEl.classList.remove("hidden");
    }

    if (!isError && !isLoading) {
      selectEl.classList.remove("hidden");
      errorEl.classList.add("hidden");
      LoaderEl.classList.add("hidden");
    }
  }

  function renderRouteOption(route) {
    const optionEl = document.createElement("option");
    optionEl.value = route.id;
    optionEl.textContent = route.name;

    return optionEl;
  }

  renderRoutes();
  commuteFormEl.addEventListener("submit", handleFormSubmit);
  saveRecordFormEl.addEventListener("submit", handleRecordSubmit);
  recordsTableEl.addEventListener("click", handleDeleteTableRow);
}

init();
