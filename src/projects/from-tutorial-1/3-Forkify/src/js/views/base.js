export const elements = {
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector(".search__field"),

    resultsPanel: document.querySelector(".results"),
    resultsList: document.querySelector(".results__list"),
    resultsPageButtons: document.querySelector('.results__pages'),

    recipePanel: document.querySelector(".recipe"),

    shoppingListPanel: document.querySelector(".shopping__list"),

    likesMenu: document.querySelector(".likes__field"),
    likesList: document.querySelector(".likes__list")
}

export const showLoader = (parent) => {
    const loader = `
        <div class="loader">
        </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(".loader");
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}
