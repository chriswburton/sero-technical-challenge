import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get('CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    IngredientsModule,
    RecipesModule,
  ],
})
export class AppModule {}
