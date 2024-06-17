import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { Recipe } from '../schemas/recipe.schema';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipeService: RecipesService) {}

  @Post()
  saveRecipe(@Body() recipeData: CreateRecipeDto): Promise<Recipe> {
    return this.recipeService.saveRecipe(recipeData);
  }
}
