import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { Input } from './components/Input';
import { useForm } from 'react-hook-form';
import { API } from './lib/api';
import {Button} from "./components/Button";
import {Measurements} from "./components/Measurements";
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import {CreateRecipeDto} from "./dtos/create-recipe.dto";
import {Recipe} from "./types";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerms, setSearchTerms] = useState('');
  const [searchedRecipes, setSearchedRecipes] = useState<Recipe[]>();
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

  const handleRecipeSearch = async () => {
      const matchingRecipes = await API.searchRecipes(searchTerms);
      setSearchedRecipes(matchingRecipes);
  }

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
        <div className={'flex justify-between items-end'}>
          <Input testId={'recipeSearch'} label={'Search existing recipes'} onChange={(value: string) => setSearchTerms(value)} />
          <Button testId={'recipeSearchSubmit'} onClick={handleRecipeSearch}>Search!</Button>
        </div>

        {searchedRecipes ? <div>
            {searchedRecipes.map(({ name, ingredients, cookingMethod }, i) => <div key={i} className={'border rounded p-2'}>
              <h4 data-testid={`recipeResult${i}Name`} className={'font-bold'}>{name}</h4>
              <ul className={'list-disc list-inside'}>
                {ingredients.map((eachIngredient, j) => <li key={j} data-testid={`recipeResult${i}Ingredient${j}`}>
                  {eachIngredient.name}
                </li>)}
              </ul>
              <p data-testid={`recipeResult${i}Method`}>Method: {cookingMethod}</p>
            </div>)}
        </div> : <>
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
        </>}
      </div>
    </Layout>
  );
}

export default App;
