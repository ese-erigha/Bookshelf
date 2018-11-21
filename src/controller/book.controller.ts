import { IBookService } from '../service/interfaces/index';
import { GenericController } from './generic.controller';
import { ServiceType } from '../core/types/index';
import { injectable, inject } from 'inversify';
import {Request,Response,NextFunction,Application} from 'express';
import { IBookModel } from '../model/entity/interfaces/index';
import { handlerMiddleware } from '../middleware/handler';
import "reflect-metadata";


@injectable()
export class BookController extends GenericController<IBookModel>{
    
    private _bookService: IBookService;

    constructor(
        @inject(ServiceType.IBookService) bookService: IBookService 
    ){
        super(bookService);
        this._bookService = bookService;
    }


    public register(app: Application): void{

        let baseClass = this;
        
        app.route('/book')
            .get(handlerMiddleware(async (req: Request, res:Response, next: NextFunction)=>{
                
                const books: IBookModel[] = await baseClass.findAll();
                res.status(200).send(books);

            }));
    }
};