import { IsMongoId } from 'class-validator';

export class SearchRecipeByIngredientsDto {
  @IsMongoId({ each: true })
  ingredientIds: string[];
}
