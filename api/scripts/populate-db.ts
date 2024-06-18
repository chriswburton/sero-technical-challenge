import mongoose from 'mongoose';
import { IngredientSchema } from '../src/schemas/ingredient.schema';

(async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);

  // seed some ingredients
  const IngredientModel = mongoose.model('Ingredient', IngredientSchema);
  await IngredientModel.deleteMany({});

  // vegetables
  await IngredientModel.create({ name: 'Avocado' });
  await IngredientModel.create({ name: 'Broccoli' });
  await IngredientModel.create({ name: 'Cucumber' });
  await IngredientModel.create({ name: 'Durian' });
  // meat
  await IngredientModel.create({ name: 'Pork' });
  await IngredientModel.create({ name: 'Beef' });
  await IngredientModel.create({ name: 'Prawns' });
  await IngredientModel.create({ name: 'Ham' });
  // carbs
  await IngredientModel.create({ name: 'Rice' });
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

  console.log('Seeding complete');
})();
