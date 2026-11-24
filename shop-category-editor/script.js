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
  const formAddCategoryEl = document.querySelector("#add-category-form");
  const formSwapCategoryEl = document.querySelector("#swap-category-form");

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

    listItemDeleteBtnEl.addEventListener("click", () => {
      findAndDeleteCategory(categories, item.id);
      updatePage();
    });

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

  function renderCategoryOptions(selector, addParentCategory) {
    const parentNode = document.querySelector(selector);
    if (!parentNode) return;

    parentNode.textContent = "";

    const categoryArray = getCategoryNamesAndIdsArray(categories);
    addParentCategory && categoryArray.unshift({ label: "Kategoria główna", id: 0 })

    parentNode.textContent = "";
    categoryArray.forEach(category => {
      const optionEl = renderCategoryOption(category);
      parentNode.append(optionEl);
    })
  }

  function getCategoryNamesAndIdsArray(arr, path = "") {
    let result = [];

    for (const category of arr) {
      const resultPath = path + `${path === "" ? "" : " / "}` + category.name;

      const categoryObj = {
        label: resultPath,
        id: category.id,
      }

      result.push(categoryObj);

      if (category.children.length > 0) {
        const output = getCategoryNamesAndIdsArray(category.children, resultPath);
        result = [...result, ...output];
      }
    }

    return result;
  }

  function renderCategoryOption(option) {
    const optionEl = document.createElement("option");
    optionEl.value = option.id;
    optionEl.textContent = option.label;

    return optionEl;
  }

  function handleAddCategorySubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    const categoryName = formObject.category_name.trim();
    const categoryId = Number(formObject.category_parent);

    if (!categoryName) {
      alert("Niepoprawna nazwa kategorii.");
      return;
    }

    const isCategoryAddedSucessfully = findAndAddCategory(categories, categoryName, categoryId);
    if (!isCategoryAddedSucessfully) return;

    updatePage();

    formAddCategoryEl.reset();
  }

  function findAndAddCategory(arr, categoryName, parentId) {
    if (parentId === 0) {
      const categoryId = getUnusedId();

      arr.push({
        id: categoryId,
        name: categoryName,
        children: [],
      })

      return true;
    }

    for (const category of arr) {
      if (category.id === parentId) {
        const categoryId = getUnusedId();
        category.children.push({
          id: categoryId,
          name: categoryName,
          children: [],
        })

        return true;
      }

      if (category.children.length > 0) {
        const wasAdded = findAndAddCategory(category.children, categoryName, parentId);

        if (wasAdded) return true;
      }
    }

    return false;
  }

  function findAndDeleteCategory(arr, categoryId) {
    const index = arr.findIndex(category => category.id === categoryId);

    if (index !== -1) {
      arr.splice(index, 1);
      return true;
    }

    for (const category of arr) {
      if (category.children.length > 0) {
        const wasDeleted = findAndDeleteCategory(category.children, categoryId);
        if (wasDeleted) return true;
      }
    }

    return false;
  }

  function getUnusedId() {
    const categoryIds = getAllCategoryIds(categories);

    let index = 1;

    while (categoryIds.includes(index)) {
      index++;
    }

    return index;
  }

  function getAllCategoryIds(arr) {
    let result = [];

    for (const category of arr) {
      result.push(Number(category.id));

      if (category.children.length > 0) {
        const output = getAllCategoryIds(category.children);
        result = [...result, ...output];
      }
    }

    return result;
  }

  function moveCategory(findCategoryId, targetCategoryId) {
    if (findCategoryId === targetCategoryId) return;
    const targetCategory = findCategoryById(categories, targetCategoryId);
    const categoryToMove = findCategoryById(categories, findCategoryId);

    if (!categoryToMove) return;
    if (!targetCategory && targetCategoryId !== 0) return;
    const isSwapIntoChildren = findCategoryById(categoryToMove.children, targetCategoryId);
    if (isSwapIntoChildren) return;

    const destinationCategories =
      targetCategoryId === 0 ? categories : targetCategory.children;

    if (destinationCategories.includes(categoryToMove)) return;

    findAndDeleteCategory(categories, findCategoryId);

    destinationCategories.push(categoryToMove);
  }

  function findCategoryById(arr, categoryId) {
    for (const category of arr) {
      if (category.id === categoryId) {
        return category;
      }

      if (category.children.length > 0) {
        const result = findCategoryById(category.children, categoryId);
        if (result) {
          return result;
        }
      }
    }

    return false;
  }

  function handleSwapCategorySubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    const swapCategoryId = Number(formObject.swap_category);
    const swapToCategoryId = Number(formObject.new_category_swap);

    console.log(swapCategoryId)

    moveCategory(swapCategoryId, swapToCategoryId);
    updatePage();
  }

  function updatePage() {
    const categoryCountEl = document.querySelector("#category-count");
    const categoryParentListEl = document.querySelector("#parent-list");

    const categorySum = countCategoryItems(categories);
    categoryCountEl.textContent = `${categorySum} kategori${categorySum === 1 ? "a" : "e"}`;

    renderCategoryOptions("category-parent-select", true);
    renderCategoryOptions("#category-to-swap-select", false);
    renderCategoryOptions("#new-category-swap-select", true);

    categoryParentListEl.textContent = "";
    renderCategoryList(categories, categoryParentListEl);
  }

  updatePage();
  formAddCategoryEl.addEventListener("submit", handleAddCategorySubmit);
  formSwapCategoryEl.addEventListener("submit", handleSwapCategorySubmit);
}

init();