import { elements } from "./base";
import Recipe from "../models/Recipe";

/* ########################################################################## */
/*                                   Public                                   */
/* ########################################################################## */

export const addSubmitSearchListener = (f) => {
    elements.searchForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        f();
    });
}

export const addPageButtonsListener = (f) => {
    elements.resultsPageButtons.addEventListener("click", (evt) => {
        evt.preventDefault();

        // Get the entire <btn> element, whether the user clicked on
        // the <span> label, the icon, or the button area itself.
        const btn = evt.target.closest(".btn-inline");
        if (btn) {
            // Read out the data-xxx attribute stored with the
            // HTML markup.
            const goto = parseInt(btn.dataset.goto, 10);
            f(goto);
        }
    });
}

export const clearSearchQuery = () => {
    elements.searchInput.value = "";
}

export const getSearchQuery = () => {
    return elements.searchInput.value;
}

export const clearRecipesList = () => {
    elements.resultsList.innerHTML = "";
}

/**
 *
 * @param {Array} recipes
 */
export const renderAllRecipes = (recipes, page=1, resultsPerPage=10) => {
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;

    let recipesOnPage = recipes.slice(start, end);
    recipesOnPage.forEach( (item) => renderOneRecipe(item) );

    renderPageButtons(recipes.length, page, resultsPerPage);
}

export const highlightSelectedRecipe = (recipeId) => {
    const prevSelectedRecipe = document.querySelector(".results__link--active");
    if (prevSelectedRecipe) {
        prevSelectedRecipe.classList.remove("results__link--active");
    }

    const currSelectedRecipe = document.querySelector(`.results__link[href="#${recipeId}"]`);
    if (currSelectedRecipe) {
        currSelectedRecipe.classList.toggle("results__link--active");
    }
}

/**
 *
 * @param {String} title
 * @param {Number} limit
 */
export function shortenTitle(title, limit=17) {
    if (title < limit) {
        return title;
    }

    const words = title.split(" ");
    let shortened = [];
    let shortLen = 0

    for (const word of words) {
        if ((shortLen + word.length) < limit) {
            shortened.push(word);
            shortLen += (word.length);
        } else {
            break;
        }
    }
    return shortened.join(" ") + " ...";
}

/* ########################################################################## */
/*                                   Private                                  */
/* ########################################################################## */

/**
 *
 * @param {Recipe} recipe
 */
function renderOneRecipe(recipe) {
    // image_url:       "http://forkify-api.herokuapp.com/images/Buffalo2BChicken2BChowder2B5002B0075c131caa8.jpg"
    // publisher:       "Closet Cooking"
    // publisher_url:   "http://closetcooking.com"
    // recipe_id:       "35169"
    // social_rank:     100
    // source_url:      "http://www.closetcooking.com/2011/11/buffalo-chicken-chowder.html"
    // title:           "Buffalo Chicken Chowder"

    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${shortenTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `
    elements.resultsList.insertAdjacentHTML("beforeend", markup);
}

function renderPageButtons(numResults, curPage, resultsPerPage) {
    const numPages = Math.ceil(numResults / resultsPerPage);

    if (numPages < 2) {
        // Don't show any buttons
        return;
    }

    elements.resultsPageButtons.innerHTML = "";

    let buttons;
    if (curPage === 1) {
        buttons = createPageButton(curPage, "next");
    } else if (curPage === numPages) {
        buttons = createPageButton(curPage, "prev");
    } else {
        buttons = `
            ${createPageButton(curPage, "prev")}
            ${createPageButton(curPage, "next")}
        `;
    }

    elements.resultsPageButtons.insertAdjacentHTML("afterbegin", buttons);
}

/**
 *
 * @param {Number} pageNum
 * @param {String} type     "prev" or "next"
 */
function createPageButton(pageNum, type) {
    const pageNumLabel = type === 'prev' ? pageNum - 1 : pageNum + 1;
    const iconType = type === 'prev' ? 'left' : 'right';
    const markup = `
        <button class="btn-inline results__btn--${type}" data-goto=${pageNumLabel}>
            <span>Page ${pageNumLabel}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${iconType}"></use>
            </svg>
        </button>
    `;

    return markup;
}
