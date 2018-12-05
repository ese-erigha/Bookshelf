import { BookDto } from './../dto/book.dto';
import { CategoryQueryDto } from './../../../../dist/dist/modules/categories/interfaces/category.query.dto.d';
import { AuthorQueryDto } from './../../../../dist/dist/modules/authors/interfaces/author.query.dto.d';
import { ValidationResult } from './../validators/validation-result.interface';
import { CreateBookDto } from './../dto/create-book.dto';
import {Injectable,HttpException, HttpStatus} from "@nestjs/common";
import { AuthorsService } from './../../authors/authors.service';
import { CategoriesService } from './../../categories/categories.service';
import { AuthorDto } from './../../authors/dto/author.dto';
import {AuthorEntity} from './../../authors/interfaces/author.entity.interface';
import {CategoryEntity} from './../../categories/interfaces/category.entity.interface';
import { CategoryDto } from './../../categories/dto/category.dto';
import * as mongoose from 'mongoose';


@Injectable()
export class BookCustomService{

    constructor(private readonly _authorService: AuthorsService, private readonly _categoryService: CategoriesService){

    }

    private isValidMongooseId(id: any): boolean{

        return mongoose.Types.ObjectId.isValid(id);
    }

    public async saveForeignEntities(bookDto: BookDto): Promise<BookDto>{

        bookDto = await this.saveNewAuthors(bookDto);
        bookDto = await this.saveNewCategories(bookDto);
        return bookDto;
    }

    private async saveNewAuthors(bookDto: BookDto): Promise<BookDto>{

        let savedAuthors: AuthorDto[] = [];

        //Save newAuthors
        for(let i = 0; i < bookDto.newAuthors.length; i++){

            let author: AuthorDto = bookDto.newAuthors[i];
            let authorEntity: AuthorEntity = await this._authorService.create({fullName: author.fullName});
            
            let savedAuthor = new AuthorDto();
            savedAuthor.id = authorEntity._id;
            savedAuthors.push(savedAuthor);
        }
        
        bookDto.existingAuthors = bookDto.existingAuthors.concat(savedAuthors);
        return bookDto;
    }

    private async saveNewCategories(bookDto: BookDto): Promise<BookDto>{

        //Save New Categories
        let savedCategories: CategoryDto[] = [];
        for(let i = 0; i < bookDto.newCategories.length; i++){

            let category: CategoryDto = bookDto.newCategories[i];
            let categoryEntity: CategoryEntity = await this._categoryService.create({name: category.name});
            let savedCategory = new CategoryDto();
            savedCategory.id = categoryEntity._id;
            savedCategories.push(savedCategory);
        }

        bookDto.existingCategories = bookDto.existingCategories.concat(savedCategories);
        return bookDto;
    }

    private async validateExistingAuthors(authors: AuthorDto[]): Promise<ValidationResult>{
        
        let hasErrors: boolean = false;
        let constraints: any = {};
        authors.forEach(async(author: AuthorDto)=>{

            if(!this.isValidMongooseId(author.id)){
                constraints[author.id] =`${author.fullName} does not exist`;
                hasErrors = true;

            }else{

                let entityAuthor = await this._authorService.findOneById(author.id);
                if(!entityAuthor){

                    constraints[author.id] =`${author.fullName} does not exist`;
                    hasErrors = true;
                }
            }

        });

        let errors: ValidationResult = {
            target: {},
            property: "existingAuthors",
            children: [],
            constraints: constraints,
            isValid: !hasErrors
        }
        return errors;

    }

    private async validateNewAuthors(authors: AuthorDto[]): Promise<ValidationResult>{

        let hasErrors: boolean = false;
        let constraints = {};
        authors.forEach(async(author: AuthorDto)=>{

            let authorQuery: AuthorQueryDto = {
                fullName: author.fullName
            }
            
            let entityAuthor = await this._authorService.findOne(authorQuery);
            if(entityAuthor){
                constraints[author.fullName] =`${author.fullName} already exist`;
                hasErrors = true;
            }

        });

        let errors: ValidationResult = {
            target: {},
            property: "newAuthors",
            children: [],
            constraints: constraints,
            isValid: !hasErrors
        }
        return errors;
    }

    
    public async validateAuthors(bookDto: BookDto){

        let hasErrors = false;
        let errors = [];
        let existingAuthorsErrors: ValidationResult = await this.validateExistingAuthors(bookDto.existingAuthors);
        if(!existingAuthorsErrors.isValid){
            delete existingAuthorsErrors["isValid"];
            errors.push(existingAuthorsErrors);
            hasErrors = true;
        }
        
        let newAuthorsErrors: ValidationResult = await this.validateNewAuthors(bookDto.newAuthors);
        if(!newAuthorsErrors.isValid){
            delete newAuthorsErrors["isValid"];
            errors.push(newAuthorsErrors);
            hasErrors = true;
        }
        
        if(hasErrors){
            throw new HttpException(errors,HttpStatus.BAD_REQUEST); 
        }
    }

    private async validateExistingCategories(categories: CategoryDto[]): Promise<ValidationResult>{
        
        let hasErrors: boolean = false;
        let constraints: any = {};
        categories.forEach(async(category: CategoryDto)=>{

            if(!this.isValidMongooseId(category.id)){
                constraints[category.id] =`${category.name} does not exist`;
                hasErrors = true;

            }else{

                let entity = await this._categoryService.findOneById(category.id);
                if(!entity){

                    constraints[category.id] =`${category.name} does not exist`;
                    hasErrors = true;
                }
            }

        });

        let errors: ValidationResult = {
            target: {},
            property: "existingCategories",
            children: [],
            constraints: constraints,
            isValid: !hasErrors
        }
        return errors;

    }

    private async validateNewCategories(categories: CategoryDto[]): Promise<ValidationResult>{

        let hasErrors: boolean = false;
        let constraints = {};
        categories.forEach(async(category: CategoryDto)=>{

            let categoryQuery: CategoryQueryDto = {
                name : category.name
            };
            
            let entity = await this._categoryService.findOne(categoryQuery);
            if(entity){
                constraints[category.name] =`${category.name} already exist`;
                hasErrors = true;
            }

        });

        let errors: ValidationResult = {
            target: {},
            property: "newCategories",
            children: [],
            constraints: constraints,
            isValid: !hasErrors
        }
        return errors;
    }


    public async validateCategories(bookDto: BookDto){

        let hasErrors = false;
        let errors = [];
        let existingCategoriesErrors: ValidationResult = await this.validateExistingCategories(bookDto.existingCategories);
        if(!existingCategoriesErrors.isValid){
            delete existingCategoriesErrors["isValid"];
            errors.push(existingCategoriesErrors);
            hasErrors = true;
        }

        let newCategoriesErrors: ValidationResult = await this.validateNewCategories(bookDto.newCategories);
        if(!newCategoriesErrors.isValid){
            delete newCategoriesErrors["isValid"];
            errors.push(newCategoriesErrors);
            hasErrors = true;
        }

        if(hasErrors){
            throw new HttpException(errors,HttpStatus.BAD_REQUEST);
            
        }
    }

    public async preSaveHook(bookDto: BookDto): Promise<BookDto>{

        let status = await this.validateAuthors(bookDto); //throws an HTTPException if validation fails
    
        status = await this.validateCategories(bookDto); //throws an HTTPException if validation fails
    
        return await this.saveForeignEntities(bookDto);

    }

}