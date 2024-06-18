import mongoose from 'mongoose';
import { IngredientSchema } from '../src/schemas/ingredient.schema';
import { RecipeSchema } from '../src/schemas/recipe.schema';

(async () => {
  await mongoose.connect(
    process.env.CONNECTION_STRING || 'mongodb://root:example@localhost:27017',
  );

  // seed some ingredients
  const IngredientModel = mongoose.model('Ingredient', IngredientSchema);
  await IngredientModel.deleteMany({});

  // vegetables
  await IngredientModel.create({ name: 'Avocado' });
  await IngredientModel.create({
    _id: '66711db434c28262b40aae32',
    name: 'Broccoli',
  });
  await IngredientModel.create({ name: 'Cucumber' });
  await IngredientModel.create({ name: 'Durian' });
  // meat
  await IngredientModel.create({ name: 'Pork' });
  await IngredientModel.create({ name: 'Beef' });
  await IngredientModel.create({ name: 'Prawns' });
  await IngredientModel.create({ name: 'Ham' });
  // carbs
  await IngredientModel.create({
    _id: '66711db434c28262b40aae40',
    name: 'Rice',
  });
  await IngredientModel.create({ name: 'Potatoes' });
  await IngredientModel.create({ name: 'Chips' });
  await IngredientModel.create({ name: 'Noodles' });
  await IngredientModel.create({ name: 'Bread' });
  // sauces
  await IngredientModel.create({ name: 'Soy Sauce' });
  await IngredientModel.create({ name: 'Ketchup' });
  await IngredientModel.create({ name: 'Brown Sauce' });
  // other
  await IngredientModel.create({ name: 'Eggs' });
  await IngredientModel.create({ name: 'Cheese' });

  // seed test recipe
  const RecipeModel = mongoose.model('Recipe', RecipeSchema);
  await RecipeModel.deleteMany({});

  await RecipeModel.create({
    name: `I am a test recipe`,
    ingredients: ['66711db434c28262b40aae32', '66711db434c28262b40aae40'],
    measurements: [
      {
        ingredientId: '66711db434c28262b40aae32',
        quantity: 77,
        unit: 'florets',
      },
      { ingredientId: '66711db434c28262b40aae40', quantity: 32, unit: 'grams' },
    ],
    cookingMethod: 'Test cooking method',
  });

  console.log('Seeding complete');
})();
