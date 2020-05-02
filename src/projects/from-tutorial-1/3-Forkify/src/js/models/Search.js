import axios from "axios";
import { API_URL } from "../config";

export default class Search {
    constructor(query) {
        this.query = query;
        this.result = null;
    }

    async getRecipes() {
        try {
            const response = await axios(`${API_URL}/search?q=${this.query}`);
            this.result = response.data.recipes;
        } catch(err) {
            throw `Could not find recipes for ${this.query}`;
        }
    }
};
