import {Recipe} from "../types";
import {CreateRecipeDto} from "../dtos/create-recipe.dto";

const BASE_PATH = 'http://localhost:4000';

export const API = {
    searchRecipes: (search: string) => fetch(
        `${BASE_PATH}/recipes?` + new URLSearchParams({
            search
        })).then((response) => response.json()),
    searchRecipesByIngredients: (ingredientIds: string[]) =>
        fetch(`${BASE_PATH}/recipes/ingredients`, {
            headers: {  "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify({ ingredientIds }),
        }).then((response) => response.json()),
    createRecipe: (recipeData: CreateRecipeDto) =>
        fetch(`${BASE_PATH}/recipes`, {
            headers: {  "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify(recipeData),
        }).then((response) => response.json()),
    getIngredients: () =>
        fetch(`${BASE_PATH}/ingredients`).then((response) => response.json()),
};
