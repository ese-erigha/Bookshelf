import { AuthorValidator, BookValidator, CategoryValidator } from './../validation/index';
import { AuthorController, GenericController, BookController, CategoryController } from './../controller/index';
import { EntityService, AuthorService, BookService, CategoryService } from './../service/implementations/index';
import {Container} from 'inversify';
import {DBType,SchemaType,RepositoryType,ServiceType,ControllerType, ValidatorType} from './types/index';
import { DatabaseFactory } from './implementations/databaseFactory';
import { IDatabaseFactory } from './interfaces/IDatabaseFactory';
import { IGenericRepository, IAuthorRepository, ICategoryRepository, IBookRepository } from './../repository/interfaces/index';
import {GenericRepository, AuthorRepository, CategoryRepository, BookRepository} from './../repository/implementations/index';
import { IBaseSchema } from './../model/schema/interfaces/IBaseSchema';
import { BaseSchema } from './../model/schema/index';
import { IEntityModel } from './../model/entity/interfaces/index';
import { IEntityService, IAuthorService, ICategoryService, IBookService } from '../service/interfaces/index';
import { RegistrableController } from './registrable.controller';
import { IValidatable } from 'validation/IValidatable';


const dependencyContainer = new Container();

//Bind Database
dependencyContainer.bind<IDatabaseFactory>(DBType.IDatabaseFactory).to(DatabaseFactory);

//Bind Schema
dependencyContainer.bind<IBaseSchema>(SchemaType.IBaseSchema).to(BaseSchema);

//Bind Repository
dependencyContainer.bind<IGenericRepository<IEntityModel>>(RepositoryType.IGenericRepository).to(GenericRepository);
dependencyContainer.bind<IAuthorRepository>(RepositoryType.IAuthorRepository).to(AuthorRepository);
dependencyContainer.bind<ICategoryRepository>(RepositoryType.ICategoryRepository).to(CategoryRepository);
dependencyContainer.bind<IBookRepository>(RepositoryType.IBookRepository).to(BookRepository);

//Bind Service
dependencyContainer.bind<IEntityService<IEntityModel>>(ServiceType.IEntityService).to(EntityService);
dependencyContainer.bind<IAuthorService>(ServiceType.IAuthorService).to(AuthorService);
dependencyContainer.bind<IBookService>(ServiceType.IBookService).to(BookService);
dependencyContainer.bind<ICategoryService>(ServiceType.ICategoryService).to(CategoryService);

//Bind Controller
dependencyContainer.bind<RegistrableController>(ControllerType.Controller).to(GenericController);
dependencyContainer.bind<RegistrableController>(ControllerType.Controller).to(AuthorController);
dependencyContainer.bind<RegistrableController>(ControllerType.Controller).to(BookController);
dependencyContainer.bind<RegistrableController>(ControllerType.Controller).to(CategoryController);


//Bind Validators
dependencyContainer.bind<IValidatable>(ValidatorType.IAuthorValidator).to(AuthorValidator);
dependencyContainer.bind<IValidatable>(ValidatorType.IBookValidator).to(BookValidator);
dependencyContainer.bind<IValidatable>(ValidatorType.ICategoryValidator).to(CategoryValidator);

export {dependencyContainer};