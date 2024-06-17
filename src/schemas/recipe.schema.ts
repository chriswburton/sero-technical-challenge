import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Ingredient } from './ingredient.schema';

@Schema()
export class Recipe {
  @Prop()
  name: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }])
  ingredients: Ingredient[];

  @Prop()
  measurements: { ingredientId: string; quantity: number; unit: string }[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
