import { CategoryDto } from './../categories/dto/category.dto';
import { AuthorDto } from './../authors/dto/author.dto';
import {BookDto, CreateBookDto, BookQueryDto, UpdateBookDto } from './dto';
import { IBookRepository } from './interfaces/IBook.repository';
import { BaseRepository } from '../base/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookEntity } from './interfaces/book.entity.interface';
import { BaseModel } from '../base/interfaces/base.model.interface';
import {classToPlain} from 'class-transformer';
import {Schema} from 'mongoose';


@Injectable()
export class BooksRepository extends BaseRepository<BookEntity> implements IBookRepository<BookEntity> {

  constructor(@InjectModel('Book') bookDBSet: BaseModel<BookEntity>) {
    super(bookDBSet);
  }

  private formatDto(bookDto: BookDto){

    let dto = classToPlain(bookDto);

    let keysToDelete = ["newCategories","existingCategories","newAuthors","existingAuthors"];
    keysToDelete.forEach((key)=>{
        delete dto[key];
    });

    return dto;
  }

  public async createNewBook(bookDto: BookDto): Promise<BookEntity>{
    
    // let dto = classToPlain(bookDto);

    // //delete keys in this array
    // let keysToDelete = ["newCategories","existingCategories","newAuthors","existingAuthors"];
    // keysToDelete.forEach((key)=>{
    //     delete dto[key];
    // });


    let dto = this.formatDto(bookDto);

    let bookEntity: BookEntity = new this._dbSet(dto);

    //Save New Authors
    bookDto.existingAuthors.forEach((author: AuthorDto)=>{
      bookEntity.authors.push(author.id);
    });
    
    //Save New Categories
    bookDto.existingCategories.forEach((category: CategoryDto)=>{
        bookEntity.categories.push(category.id);
    });

    return await bookEntity.save();
  }

  public async updateBook(id: Schema.Types.ObjectId ,bookDto: BookDto): Promise<BookEntity>{

    const dto = this.formatDto(bookDto);

    if(bookDto.existingAuthors.length){

        dto["authors"] = [];
        //Save Authors
        bookDto.existingAuthors.forEach((author: AuthorDto)=>{
            dto["authors"].push(author.id);
        });
    }

    if(bookDto.existingCategories.length){

        dto["categories"] = [];

        //Save Categories
        bookDto.existingCategories.forEach((category: CategoryDto)=>{
          dto["categories"].push(category.id);
        });
    }
    return await this._dbSet.findByIdAndUpdate(id,dto,{new: true}).lean().exec();
  }

  public async fetchBookWithPopulation(cond: BookQueryDto): Promise<BookEntity>{

      let query = classToPlain(cond);
      let populateQuery = [
        {
          path: 'authors'
        },
        {
          path: 'categories'
        }
      ]
      return await this._dbSet.findOne(query)
                .populate(populateQuery)
                .lean()
                .exec();
  }
}