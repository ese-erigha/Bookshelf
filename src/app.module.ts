import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';



@Module({
  imports: [
    ConfigModule, 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService)=>({
        uri: configService.mongoDBURI
      }),
      inject: [ConfigService]
    }),
    CategoriesModule
  ],
  //controllers: [AppController],
  //providers: [AppService],
  controllers: [],
  providers: []
  
})
export class AppModule {}
