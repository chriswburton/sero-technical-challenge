const BASE_PATH = 'http://localhost:4000';

export const API = {
  createRecipe: (recipeData: any) =>
    fetch(`${BASE_PATH}/recipes`, {
        headers: {  "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify(recipeData),
    }).then((response) => response.json()),
  getIngredients: () =>
    fetch(`${BASE_PATH}/ingredients`, {
      method: 'GET',
    }).then((response) => response.json()),
};
