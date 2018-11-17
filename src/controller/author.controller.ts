import { IAuthorService } from '../service/interfaces/index';
import { GenericController } from './generic.controller';
import { ServiceType } from '../core/types/index';
import { injectable, inject } from 'inversify';
import {Request,Response,NextFunction,Application} from 'express';
import { RegistrableController } from 'core/registrable.controller';
import { IAuthorModel } from 'model/entity/interfaces/index';
import { handlerMiddleware } from 'middleware/handler';


@injectable()
export class AuthorController extends GenericController<IAuthorModel> implements RegistrableController{
    
    private _authorService: IAuthorService;

    constructor(
        @inject(ServiceType.IAuthorService) authorService: IAuthorService 
    ){
        super(authorService);
        this._authorService = authorService;
    }


    public register(app: Application): void{

        app.route('/author')
            .get(handlerMiddleware(async (req: Request, res:Response, next: NextFunction)=>{
                
                const authors: IAuthorModel[] = await super.findAll();
                res.status(200).send(authors);

            }));
    }
};