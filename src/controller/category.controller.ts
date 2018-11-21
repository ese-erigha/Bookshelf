import { ICategoryService } from '../service/interfaces/index';
import { GenericController } from './generic.controller';
import { ServiceType } from '../core/types/index';
import { injectable, inject } from 'inversify';
import {Request,Response,NextFunction,Application} from 'express';
import { ICategoryModel } from '../model/entity/interfaces/index';
import { handlerMiddleware } from '../middleware/handler';
import "reflect-metadata";


@injectable()
export class CategoryController extends GenericController<ICategoryModel>{
    
    private _categoryService: ICategoryService;

    constructor(
        @inject(ServiceType.ICategoryService) categoryService: ICategoryService 
    ){
        super(categoryService);
        this._categoryService = categoryService;
    }


    public register(app: Application): void{

        let baseClass = this;
        
        app.route('/category')
            .get(handlerMiddleware(async (req: Request, res:Response, next: NextFunction)=>{
                
                const categories: ICategoryModel[] = await baseClass.findAll();
                res.status(200).send(categories);

            }));
    }
};