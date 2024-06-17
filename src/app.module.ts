import { Module } from '@nestjs/common';
import { RecipeModule } from './recipes/recipe.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

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
    RecipeModule,
  ],
})
export class AppModule {}
