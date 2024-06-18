import { Injectable } from '@nestjs/common';
import { Recipe } from '../schemas/recipe.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private readonly recipeModel: Model<Recipe>,
  ) {}

  searchRecipes(searchTerms: string): Promise<Recipe[]> {
    return this.recipeModel
      .find({
        name: new RegExp(searchTerms),
      })
      .populate('ingredients');
  }

  searchRecipesByIngredients(ingredientIds: string[]): Promise<Recipe[]> {
    return this.recipeModel
      .find({
        ingredients: { $in: ingredientIds },
      })
      .populate('ingredients');
  }

  saveRecipe(recipeData: CreateRecipeDto): Promise<Recipe> {
    return this.recipeModel.create(recipeData);
  }
}
