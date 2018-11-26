import { Module} from '@nestjs/common';
import {APP_PIPE} from "@nestjs/core";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';



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
    CategoriesModule,
    AuthorsModule,
    BooksModule
  ],
  //controllers: [AppController],
  //providers: [AppService],
  controllers: [],
  providers: [
    
  ]
  
})
export class AppModule {}
