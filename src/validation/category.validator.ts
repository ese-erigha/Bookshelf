import { ValidationResult } from './validator.result';
import { BaseValidator } from './base.validator';
import {Request, Response, NextFunction} from "express";
import { IValidatable } from './IValidatable';
const Joi = require('joi');

export class CategoryValidator extends BaseValidator implements IValidatable{

    constructor(){

        super();
    }

    getValidationSchema(){

        const schema = Joi.object.keys({

            //FullName is required
            name: Joi.string().required()
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