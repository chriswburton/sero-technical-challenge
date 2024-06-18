export interface Recipe {
    name: string;
    ingredients: { name: string }[];
    measurements: { ingredientId: string; quantity: number; unit: string; }[]
    cookingMethod: string;
}
