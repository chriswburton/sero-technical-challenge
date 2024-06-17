import { Body, Controller, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { Recipe } from '../schemas/recipe.schema';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  saveRecipe(@Body() recipeData: CreateRecipeDto): Promise<Recipe> {
    return this.recipeService.saveRecipe(recipeData);
  }
}
