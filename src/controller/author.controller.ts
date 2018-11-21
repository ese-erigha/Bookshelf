import { ValidatorType } from './../core/types/validator';
import { AuthorValidator } from './../validation/index';
import { IValidatable } from 'validation/IValidatable';
import { IAuthorService } from '../service/interfaces/index';
import { GenericController } from './generic.controller';
import { ServiceType } from '../core/types/index';
import { injectable, inject } from 'inversify';
import {Request,Response,NextFunction,Application} from 'express';
import { IAuthorModel } from '../model/entity/interfaces/index';
import { handlerMiddleware } from '../middleware/handler';
import {dependencyContainer} from "../core/dependency.config";


@injectable()
export class AuthorController extends GenericController<IAuthorModel>{
    
    private _authorService: IAuthorService;
    protected _authorValidator: IValidatable;

    constructor(
        @inject(ServiceType.IAuthorService) authorService: IAuthorService 
    ){
        super(authorService);
        this._authorService = authorService;
        this._authorValidator = dependencyContainer.get<IValidatable>(ValidatorType.IAuthorValidator);
    }


    public register(app: Application): void{

        let baseClass = this;
        
        app.route('/author')
            .get(handlerMiddleware(async (req: Request, res:Response, next: NextFunction)=>{
                
                const authors: IAuthorModel[] = await baseClass.findAll();
                res.status(200).send(authors);

            }))
            .post([this._authorValidator.validate()], handlerMiddleware(async (req: Request, res:Response, next: NextFunction)=>{
                
                //Automapper from req to viewModel
                const authors: IAuthorModel[] = await baseClass.findAll();
                res.status(200).send(authors);

            }))
    }
};