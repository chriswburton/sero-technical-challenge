import { Controller, Get } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from '../schemas/ingredient.schema';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  getIngredients(): Promise<Ingredient[]> {
    return this.ingredientsService.getIngredients();
  }
}
