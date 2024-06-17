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

  saveRecipe(recipeData: CreateRecipeDto): Promise<Recipe> {
    return this.recipeModel.create(recipeData);
  }
}
