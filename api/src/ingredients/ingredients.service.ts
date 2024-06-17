import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Ingredient} from "../schemas/ingredient.schema";

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name) private readonly ingredientModel: Model<Ingredient>,
  ) {}

  getIngredients(): Promise<Ingredient[]> {
    return this.ingredientModel.find();
  }
}
