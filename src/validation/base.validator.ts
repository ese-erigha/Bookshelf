import { ValidationResult } from './validator.result';
import { Request, Response, NextFunction } from 'express';
const Joi = require('joi');

export class BaseValidator{

    
    protected runValidator(schema: any, req: Object): ValidationResult{

        let data = JSON.parse(JSON.stringify(req));
        let validator = Joi.validate(data,schema,{abortEarly: false});
        let validationResult = new ValidationResult();
        if(validator.error !== null){
            
            validationResult.isValid = false;
            validationResult.error = validator.error; 
        }
        return validationResult;
    }

}