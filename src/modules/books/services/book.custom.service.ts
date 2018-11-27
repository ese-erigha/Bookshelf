import { CreateBookDto } from './../dto/create-book.dto';
import { Injectable } from "@nestjs/common";
import { AuthorsService } from './../../authors/authors.service';
import { CategoriesService } from './../../categories/categories.service';
import { AuthorDto } from './../../authors/dto/author.dto';
import {AuthorEntity} from './../../authors/interfaces/author.entity.interface';
import {CategoryEntity} from './../../categories/interfaces/category.entity.interface';
import { CategoryDto } from './../../categories/dto/category.dto';


@Injectable()
export class BookCustomService{

    constructor(private readonly _authorService: AuthorsService, private readonly _categoryService: CategoriesService){

    }

    async saveNewAuthors(bookDto: CreateBookDto): Promise<CreateBookDto>{

        let savedAuthors: AuthorDto[] = [];

        //Save newAuthors
        bookDto.newAuthors.forEach(async(author: AuthorDto)=>{

            let authorEntity: AuthorEntity = await this._authorService.create({fullName: author.fullName});
            let savedAuthor = new AuthorDto();
            savedAuthor.id = authorEntity._id;
            savedAuthors.push(savedAuthor);
        });

        bookDto.existingAuthors = bookDto.existingAuthors.concat(savedAuthors);
        return bookDto;
    }

    async saveNewCategories(bookDto: CreateBookDto): Promise<CreateBookDto>{

        //Save New Categories
        let savedCategories: CategoryDto[] = [];

        bookDto.newCategories.forEach(async(category: CategoryDto)=>{
            let categoryEntity: CategoryEntity = await this._categoryService.create({name: category.name});
            let savedCategory = new CategoryDto();
            savedCategory.id = categoryEntity._id;
            savedCategories.push(savedCategory);
        });

        bookDto.existingCategories = bookDto.existingCategories.concat(savedCategories);
        return bookDto;
    }

    async saveForeignEntities(bookDto: CreateBookDto): Promise<CreateBookDto>{

        bookDto = await this.saveNewAuthors(bookDto);
        bookDto = await this.saveNewCategories(bookDto);
        return bookDto;
    }

}