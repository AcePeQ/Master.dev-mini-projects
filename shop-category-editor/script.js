const categories = [
  {
    id: 1,
    name: "Elektronika",
    children: [
      {
        id: 2,
        name: "Telefony",
        children: [
          { id: 3, name: "Smartfony", children: [] },
          { id: 4, name: "Akcesoria", children: [] },
        ],
      },
      {
        id: 5,
        name: "Komputery",
        children: [],
      },
    ],
  },
  {
    id: 6,
    name: "Dom i ogród",
    children: [],
  },
];

function init() {
  function renderCategoryList(arr, parentNode) {
    for (const category of arr) {
      const categoryItemNode = createCategoryListItemNode(category)
      parentNode.append(categoryItemNode)

      if (category.children.length > 0) {
        const categoryListEl = document.createElement("ul");
        categoryItemNode.append(categoryListEl);
        renderCategoryList(category.children, categoryListEl);
      }
    }
  }

  function createCategoryListItemNode(item) {
    const listItemEl = document.createElement("li");
    listItemEl.classList.add("list-item")
    listItemEl.dataset.itemId = item.id;

    const listItemWrapperEl = document.createElement("div");
    listItemWrapperEl.classList.add("list-item__wrapper");

    const listItemNameEl = document.createElement("p");
    listItemNameEl.textContent = item.name;

    const listItemDeleteBtnEl = document.createElement("button");
    listItemDeleteBtnEl.textContent = "Usuń"
    listItemDeleteBtnEl.type = "button";
    listItemDeleteBtnEl.classList.add("delete-button");
    listItemDeleteBtnEl.dataset.action = "delete";
    listItemDeleteBtnEl.ariaLabel = `Usuń kategorię ${item.name}`;

    listItemWrapperEl.append(
      listItemNameEl,
      listItemDeleteBtnEl
    )

    listItemEl.append(
      listItemWrapperEl
    )

    return listItemEl;
  }

  function countCategoryItems(arr) {
    let sum = 0;

    for (const category of arr) {
      if (category.children.length > 0) {
        sum += countCategoryItems(category.children);
      }

      sum++;
    }

    return sum;
  }

  function renderCategoryOptions() {

  }

  function renderCategoryOption(option) {

  }

  function updatePage() {
    const categoryCountEl = document.querySelector("#category-count");
    const categoryParentListEl = document.querySelector("#parent-list");

    const categorySum = countCategoryItems(categories);
    categoryCountEl.textContent = `${categorySum} kategori${categorySum === 1 ? "a" : "i"}`;

    categoryParentListEl.textContent = ""
    renderCategoryList(categories, categoryParentListEl);
  }

  updatePage();
}

init();