import Likes from "./models/Likes";
import Recipe from "./models/Recipe";
import Search from "./models/Search";
import ShoppingList from "./models/ShoppingList";
import * as SearchView from "./views/SearchView";
import * as RecipeView from "./views/RecipeView";
import * as ShoppingListView from "./views/ShoppingListView";
import * as LikesView from "./views/LikesView";
import { elements, showLoader, clearLoader } from "./views/base";

/* ########################################################################## */
/*                                    State                                   */
/* ########################################################################## */

/**
 * Global App State
 *
 * * Current Search Object
 * * Current Recipe Object
 * * Shopping List (Array of Recipes)
 * * Liked Recipes
 */
const state = {
    searchResults: null,
    recipe: null,
    shoppingList: null,
    likes: null
};

/* ########################################################################## */
/*                                    Views                                   */
/* ########################################################################## */

SearchView.addSubmitSearchListener(onSearch);
SearchView.addPageButtonsListener(onGoToPage);

RecipeView.addUpdateServingsListener(onUpdateServings);
RecipeView.addAddToShoppingListListener(onAddToShoppingList);
RecipeView.addLikeUnlikeListener(onLikeUnlike);

ShoppingListView.addUpdateListListener(onUpdateList);

window.addEventListener("hashchange", onSelectRecipe);
window.addEventListener("load", onSelectRecipe);
window.addEventListener("load", onRestoreLikes);

/* ########################################################################## */
/*                               Search Controller                            */
/* ########################################################################## */

async function onSearch() {
    // Get the submitted query
    const query = SearchView.getSearchQuery();

    if (query) {
        // Create a model for the new search
        state.search = new Search(query);

        // Clear previous search
        SearchView.clearSearchQuery();
        SearchView.clearRecipesList();
        showLoader(elements.resultsPanel);

        // Do the actual search
        await state.search
            .getRecipes()
            .then(() => {
                // Show search results
                SearchView.renderAllRecipes(state.search.result);
            })
            .catch((err) => {
                console.error(err);
            });

        // Always clear the loader whether or not search succeeded
        clearLoader();
    }
}

async function onGoToPage(goto) {
    SearchView.clearRecipesList();
    SearchView.renderAllRecipes(state.search.result, goto);
}

/* ########################################################################## */
/*                              Recipe Controller                             */
/* ########################################################################## */

async function onSelectRecipe() {
    // Get the recipe ID from the URL
    const recipeId = window.location.hash.replace("#", "");

    if (recipeId) {
        // Create Recipe object
        state.recipe = new Recipe(recipeId);

        // Prepare the UI
        SearchView.highlightSelectedRecipe(state.recipe.id);
        RecipeView.clearRecipe();
        showLoader(elements.recipePanel);

        // Get the recipe data
        await state.recipe
            .getRecipe()
            .then(() => {
                // console.dir(state.recipe);

                // Update the UI
                RecipeView.renderRecipe(
                    state.recipe,
                    state.likes ? state.likes.isLiked(recipeId) : false
                );
            })
            .catch((err) => {
                console.error(err);
            });

        clearLoader();
    }
}

/**
 *
 * @param {String} type "inc" or "dec"
 */
function onUpdateServings(type) {
    if (type === "dec" && state.recipe.servingSize === 1) {
        // We cannot have zero servings.
        return;
    }

    state.recipe.updateServings(type);
    RecipeView.updateRecipe(state.recipe);
}

/* ########################################################################## */
/*                            ShoppingList Controller                         */
/* ########################################################################## */

function onAddToShoppingList() {
    // Create a new list if there isn't one yet
    if (!state.shoppingList) {
        state.shoppingList = new ShoppingList();
    }

    // Add each ingredient to the list
    state.recipe.ingredients.forEach((el) => {
        const newItem = state.shoppingList.addItem(el.count, el.unit, el.name);
        ShoppingListView.renderItem(newItem);
    });
}

/**
 *
 * @param {String} action "del" or "cnt"
 * @param {String} itemId
 * @param {Number} count  Only for "cnt"
 */
function onUpdateList(action, itemId, count) {
    if (action === "del") {
        // Delete from state
        state.shoppingList.deleteItem(itemId);

        // Delete from UI
        ShoppingListView.deleteItem(itemId);
    } else if (action === "cnt") {
        // Update the state
        state.shoppingList.updateItemCount(itemId, count);
    }

    // console.dir(state.shoppingList);
}

/* ########################################################################## */
/*                              Likes Controller                              */
/* ########################################################################## */

function onLikeUnlike() {
    if (!state.likes) {
        state.likes = new Likes();
    }

    const currRecipeId = state.recipe.id;
    const isLiked = state.likes.isLiked(currRecipeId);

    if (!isLiked) {
        // User has not yet liked the current recipe
        const newLike = state.likes.addLike(
            currRecipeId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.imgUrl
        );

        // Toggle the Like button to Liked
        LikesView.toggleLikeButton(true);

        // Add recipe to Likes menu
        LikesView.renderLike(newLike);
    } else {
        // User has already liked the current recipe
        state.likes.deleteLike(currRecipeId);

        // Toggle the Like button to UnLiked
        LikesView.toggleLikeButton(false);

        // Remove recipe from Likes menu
        LikesView.deleteLike(currRecipeId);
    }

    LikesView.toggleLikesMenu(state.likes.getNumLikes());

    // console.log(state.likes);
}

function onRestoreLikes() {
    state.likes = new Likes();
    state.likes.retrieveData();
    state.likes.items.forEach((el) => {
        LikesView.renderLike(el);
    });
    LikesView.toggleLikesMenu(state.likes.getNumLikes());
}
