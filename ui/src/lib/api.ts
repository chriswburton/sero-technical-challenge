const BASE_PATH = 'http://localhost:4000';

export const API = {
    searchRecipes: (search: string) => fetch(
        `${BASE_PATH}/recipes?` + new URLSearchParams({
            search
        })).then((response) => response.json()),
    createRecipe: (recipeData: any) =>
        fetch(`${BASE_PATH}/recipes`, {
            headers: {  "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify(recipeData),
        }).then((response) => response.json()),
    getIngredients: () =>
        fetch(`${BASE_PATH}/ingredients`).then((response) => response.json()),
};
