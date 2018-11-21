import { ValidationResult } from './validator.result';
import { BaseValidator } from './base.validator';
import {Request, Response, NextFunction} from "express";
import { IValidatable } from './IValidatable';
const Joi = require('joi');

export class BookValidator extends BaseValidator implements IValidatable{

    constructor(){

        super();
    }

    getValidationSchema(){

        const schema = Joi.object.keys({
            
            name: Joi.string().required(),
            isbn: Joi.string().required(),
            pageCount: Joi.string().min(1),
            publishedDate: Joi.date().iso(),
            thumbnailUrl: Joi.string().uri(),
            longDescription: Joi.string().valid('').optional(),
            status: Joi.string().valid(['published','unpublished'])
        });

        return schema;
    }

    public validate(){

        return async(req: Request, res: Response, next: NextFunction)=>{

            try{

                let validationResult: ValidationResult = this.runValidator(this.getValidationSchema(),req.body);
                if(!validationResult.isValid){
                    res.status(403).send(validationResult.error);

                }else{

                    next();
                }

            }catch(err){
                next(err);
            }
        }
    }
};