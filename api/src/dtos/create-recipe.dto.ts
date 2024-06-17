import {
  IsMongoId,
  IsNumber,
  IsString,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Measurement {
  @IsMongoId()
  ingredientId: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsString()
  @Length(1, 30)
  unit: string;
}

export class CreateRecipeDto {
  @IsString()
  @Length(1, 30)
  name: string;

  @IsMongoId({ each: true })
  ingredients: string[];

  @ValidateNested()
  @Type(() => Measurement)
  measurements: Measurement[];

  @IsString()
  @Length(1, 30)
  cookingMethod: string;
}
