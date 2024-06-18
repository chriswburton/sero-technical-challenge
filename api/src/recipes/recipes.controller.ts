import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { Recipe } from '../schemas/recipe.schema';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipeService: RecipesService) {}

  @Get()
  searchRecipes(@Query('search') searchTerms: string): Promise<Recipe[]> {
    return this.recipeService.searchRecipes(searchTerms);
  }

  @Post()
  saveRecipe(@Body() recipeData: CreateRecipeDto): Promise<Recipe> {
    return this.recipeService.saveRecipe(recipeData);
  }
}
