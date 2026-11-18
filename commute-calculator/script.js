function init() {
  const commuteFormEl = document.querySelector("#commute-form")

  function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());

    console.log(formData)
    console.log(formObject)
  }

  commuteFormEl.addEventListener("submit", handleFormSubmit)
}

init();