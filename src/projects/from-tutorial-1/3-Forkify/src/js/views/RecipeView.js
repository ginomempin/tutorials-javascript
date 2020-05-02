import { elements } from "./base";
import { Fraction } from "fractional";

/* ########################################################################## */
/*                                    Public                                  */
/* ########################################################################## */

export const addUpdateServingsListener = (f) => {
    elements.recipePanel.addEventListener("click", (evt) => {
        evt.preventDefault();

        if (evt.target.matches(".btn-decrease, .btn-decrease *")) {
            f("dec");
        } else if (evt.target.matches(".btn-increase, .btn-increase *")) {
            f("inc");
        }
    })
};

export const addAddToShoppingListListener = (f) => {
    elements.recipePanel.addEventListener("click", (evt) => {
        evt.preventDefault();

        if (evt.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
            f();
        }
    });
};

export const addLikeUnlikeListener = (f) => {
    elements.recipePanel.addEventListener("click", (evt) => {
        evt.preventDefault();

        if (evt.target.matches(".recipe__love, .recipe__love *")) {
            f();
        }
    });
}

export const clearRecipe = () => {
    elements.recipePanel.innerHTML = "";
}

/**
 *
 * @param {Recipe} recipe
 */
export const renderRecipe = (recipe, isLiked) => {
    const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.imgUrl}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTimeMins}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servingSize}</span>
                <span class="recipe__info-text"> servings</span>
                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
        </div>
        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map((item) => createIngredient(item)).join("")}
            </ul>
            <button class="btn-small recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>
        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.srcUrl}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>
            </a>
        </div>
    `;

    elements.recipePanel.insertAdjacentHTML("afterbegin", markup);
};

export const updateRecipe = (recipe) => {
    // Update servings
    const servingLbl = document.querySelector(".recipe__info-data--people");
    servingLbl.textContent = recipe.servingSize;

    // Update ingredients
    const countArr = Array.from(document.querySelectorAll(".recipe__count"));
    countArr.forEach((item, idx) => {
        item.textContent = formatCount(recipe.ingredients[idx].count);
    });
}

/* ########################################################################## */
/*                                   Private                                  */
/* ########################################################################## */

function createIngredient(ingredient) {
    const markup = `
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${formatCount(ingredient.count)}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.name}
            </div>
        </li>
    `;
    return markup;
}

/**
 *
 * @param {Number} count
 */
function formatCount(count) {
    if (count) {

        // Round-off the count value (ex. 0.33333... => 0.33)
        // Then, that Math.round function only returns an
        // integer, so shift the decimal point, round-off,
        // then shift back the decimal point.
        const rndCount = Math.round(count * 10000) / 10000;

        const [int, dec] = rndCount
                            .toString()
                            .split(".")
                            .map((num) => parseInt(num, 10));
        if (!dec) {
            // 2 => "2"
            return rndCount.toString();
        } else if (int === 0) {
            // 0.5 => 1/2
            const frac = new Fraction(rndCount);
            return `${frac.numerator}/${frac.denominator}`;
        } else {
            // 2.5 => 2 0.5 => 1/2
            const frac = new Fraction(rndCount - int);
            return `${int} ${frac.numerator}/${frac.denominator}`;
        }
    } else {
        return "?";
    }
}
