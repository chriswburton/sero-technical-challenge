import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { Input } from './components/Input';
import { useForm } from 'react-hook-form';
import { API } from './lib/api';
import {Button} from "./components/Button";
import {Measurements} from "./components/Measurements";
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import {CreateRecipeDto} from "./dtos/create-recipe.dto";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const newRecipeForm = useForm<CreateRecipeDto>({
    defaultValues: {
      ingredients: [],
      measurements: []
    },
    resolver: classValidatorResolver(CreateRecipeDto)
  });
  newRecipeForm.watch()

  useEffect(() => {
    handleGetIngredients();
  }, []);

  const handleGetIngredients = async () => {
    const serverIngredients = await API.getIngredients();
    setIngredients(serverIngredients);
  };

  const handleCreateRecipe = async () => {
    const recipeData = newRecipeForm.getValues();

    // populate ingredients array
    recipeData.ingredients = recipeData.measurements.reduce((acc: string[], { ingredientId }) => {
      if (acc.includes(ingredientId)) return acc;
      return [...acc, ingredientId];
    }, [])

    await API.createRecipe(recipeData);
  };

  return (
    <Layout>
      <div className={'flex flex-col space-y-4'}>
        <h1 className={'font-bold font-lg'}>Add recipe</h1>
        <Input
          testId={'createRecipeName'}
          label={'Name'}
          form={newRecipeForm}
          name={'name'}
        />

        <Measurements form={newRecipeForm} ingredients={ingredients} />

        <Input
          testId={'createRecipeCookingMethod'}
          label={'Cooking method'}
          form={newRecipeForm}
          name={'cookingMethod'}
        />

        <Button
            testId={'createRecipeSubmit'}
            form={newRecipeForm}
            onClick={() => handleCreateRecipe()}
        >
          Save
        </Button>
      </div>
    </Layout>
  );
}

export default App;
