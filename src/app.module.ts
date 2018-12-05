import { Module, NestModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { UsersModule } from './modules/users/users.module';
import { TokenValidationMiddleware } from './modules/base/middlewares/token.validation.middleware';
import { CategoriesController } from './modules/categories/categories.controller';
import { AuthorsController } from './modules/authors/authors.controller';
import { BooksController } from './modules/books/books.controller';
import { AuthModule } from './modules/auth/auth.module';
import { RolesGuard } from './modules/base/guards/roles.guard';


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
    BooksModule,
    UsersModule,
    AuthModule
  ],
  //controllers: [AppController],
  //providers: [AppService],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
  
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer){
    consumer
        .apply(TokenValidationMiddleware)
        .exclude(
          {
            path: 'auth/signup', method: RequestMethod.POST
          },
          {
            path: 'auth/login', method: RequestMethod.POST
          }
        )
        .forRoutes(AuthorsController,BooksController,CategoriesController);  
  }
}
