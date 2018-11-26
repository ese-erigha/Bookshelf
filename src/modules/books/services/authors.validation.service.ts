import {HttpException, HttpStatus} from "@nestjs/common";
import { AuthorDto } from './../../authors/dto/author.dto';
import { AuthorsService } from './../../authors/authors.service';
import { Injectable } from "@nestjs/common";
import * as mongoose from 'mongoose';
import { ValidationResult } from './../validators/validation-result.interface';
import { CreateBookDto } from './../dto/create-book.dto';


@Injectable()
export class AuthorsValidationService{

    constructor(private readonly authorService: AuthorsService){}

    private async validateExistingAuthors(authors: AuthorDto[]): Promise<ValidationResult>{
        
        let hasErrors: boolean = false;
        let constraints = {};
        authors.forEach(async(author: AuthorDto)=>{

            if(!this.isValidMongooseId(author.id)){
                constraints[author.id] =`${author.fullName} does not exist`;
                hasErrors = true;

            }else{

                let entityAuthor = await this.authorService.findOneById(author.id);
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
            isValid: hasErrors
        }
        return errors;

    }

    private async validateNewAuthors(authors: AuthorDto[]): Promise<ValidationResult>{

        let hasErrors: boolean = false;
        let constraints = {};
        authors.forEach(async(author: AuthorDto)=>{

            let entityAuthor = await this.authorService.findOne({fullName: author.fullName});
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
            isValid: hasErrors
        }
        return errors;
    }

    private isValidMongooseId(id: string): boolean{
        return mongoose.Types.ObjectId.isValid(id);
    }


    public async validateAuthors(bookDto: CreateBookDto){

        let hasErrors = false;
        let errors = [];
        let existingUsersErrors: ValidationResult = await this.validateExistingAuthors(bookDto.existingAuthors);
        if(!existingUsersErrors.isValid){
            delete existingUsersErrors["isValid"];
            errors.push(existingUsersErrors);
            hasErrors = true;
        }

        let newUsersErrors: ValidationResult = await this.validateNewAuthors(bookDto.newAuthors);
        if(!newUsersErrors.isValid){
            delete newUsersErrors["isValid"];
            errors.push(newUsersErrors);
            hasErrors = true;
        }

        if(hasErrors){
            throw new HttpException(errors,HttpStatus.BAD_REQUEST);
            
        }
    }
};