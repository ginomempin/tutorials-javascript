import axios from "axios";
import { API_URL } from "../config";

const UNIT_CONVERSION = {
    "tablespoons":  "tbsp",
    "tablespoon":   "tbsp",

    "teaspoons":    "tsp",
    "teaspoon":     "tsp",

    "ounces":       "oz",
    "ounce":        "oz",

    "cups":         "cup",

    "pounds":       "lb",
    "pound":        "lb",

    "kilograms":    "kg",
    "kilos":        "kg",
    "kilo":         "kg"
}
Object.freeze(UNIT_CONVERSION);

const UNITS = new Set(Object.values(UNIT_CONVERSION));
Object.freeze(UNITS);

export default class Recipe {
    constructor(id) {
        this.id = id;
        this.title = String();
        this.author = String();
        this.imgUrl = String();
        this.srcUrl = String();
        this.ingredients = Array();
        this.cookingTimeMins = Number();
        this.servingSize = Number();
    }

    async getRecipe() {
        try {
            const response = await axios(`${API_URL}/get?rId=${this.id}`);
            // console.log(response);

            const recipe = response.data.recipe;
            this.title = recipe.title;
            this.author = recipe.publisher;
            this.imgUrl = recipe.image_url;
            this.srcUrl = recipe.source_url;
            this.ingredients = recipe.ingredients;

            this.calcServingSize();
            this.calcCookingTime();
            this.parseIngredients();
        } catch(err) {
            throw `Could not get recipe=${this.id}`;
        }
    }

    calcCookingTime() {
        // Assume 15mins for every 3 ingredients
        const periods = Math.ceil(this.ingredients.length / 3);
        this.cookingTimeMins = periods * 15;
    }

    calcServingSize() {
        this.servingSize = Math.floor(Math.random() * 4);
    }

    parseIngredients() {
        const parsed = this.ingredients.map((item) => {
            // Standardize units
            let ingredient = item.toLowerCase();
            for (const longUnit in UNIT_CONVERSION) {
                ingredient = ingredient.replace(longUnit, UNIT_CONVERSION[longUnit]);
            }

            // Remove parentheses and other punctuations
            ingredient = ingredient.replace(/\([^)]*\)]/g, "");
            ingredient = ingredient.replace(",", "");
            // console.log(ingredient);

            // Split into count, unit, ingredient name
            let partsArr = ingredient.split(" ");
            let partsObj;
            let unitIdx = partsArr.findIndex(part => UNITS.has(part));
            if (unitIdx > -1) {
                // console.log("Has a unit");

                // Ex. 4 1/2 cups => count = [4, 1/2] = 4+1/2
                // Ex. 4     cups => count = [4]      = 4
                // Ex. 1-1/2 cups => count = [1-1/2]  = 1+1/2
                const countArr = partsArr.slice(0, unitIdx);
                let count;
                if (countArr.length === 1) {
                    count = eval(countArr[0].replace("-", "+"));
                } else {
                    // Join the numbers and compute
                    count = eval(countArr.join("+"));
                }
                partsObj = {
                    count,
                    unit: partsArr[unitIdx],
                    name: partsArr.slice(unitIdx + 1).join(" ")
                }
            } else if (parseInt(partsArr[0], 10)) {
                // console.log("Has NO units BUT 1st part is a number");

                partsObj = {
                    count: parseInt(partsArr[0], 10),
                    unit: "",
                    name: partsArr.slice(1).join(" ")
                }
            } else {
                // console.log("Has NO units");

                partsObj = {
                    count: 1,
                    unit: "",
                    name: ingredient
                }
            }

            return partsObj;
        });
        this.ingredients = parsed;
    }

    /**
     *
     * @param {String} type "inc" or "dec"
     */
    updateServings(type) {
        const oldSize = this.servingSize;
        const newSize = type === "inc" ? oldSize + 1 : oldSize - 1;

        this.servingSize = newSize;
        this.ingredients.forEach((ing) => {
            ing.count *= (newSize / oldSize);
        });
    }
}
