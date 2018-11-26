import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksRepository } from './books.repository';
import { BooksService } from './books.service';
import { AuthorsValidationService } from './services/authors.validation.service';
import { BooksController } from './books.controller';
import { BookSchema } from './schemas/book.schema';
import { IsBookAlreadyExist } from './validators/IsBookAlreadyExist';
import { AuthorsModule } from './../authors/authors.module';
import { CategoriesModule } from './../categories/categories.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),AuthorsModule, CategoriesModule],
  controllers: [BooksController],
  providers: [BooksService,AuthorsValidationService, BooksRepository, IsBookAlreadyExist],
  exports: [BooksService]
})
export class BooksModule{}