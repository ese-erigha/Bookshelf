import { AuthorController } from './../controller/index';
import { EntityService, AuthorService } from './../service/implementations/index';
import {Container} from 'inversify';
import {DBType,SchemaType,RepositoryType,ServiceType,ControllerType} from './types/index';
import { DatabaseFactory } from './implementations/databaseFactory';
import { IDatabaseFactory } from './interfaces/IDatabaseFactory';
import { IGenericRepository, IAuthorRepository } from './../repository/interfaces/index';
import {GenericRepository, AuthorRepository} from './../repository/implementations/index';
import { IBaseSchema } from './../model/schema/interfaces/IBaseSchema';
import { BaseSchema } from './../model/schema/index';
import { IEntityModel } from './../model/entity/interfaces/index';
import { IEntityService, IAuthorService } from 'service/interfaces/index';
import { RegistrableController } from './registrable.controller';

const container = new Container();

//Bind Database
container.bind<IDatabaseFactory>(DBType.IDatabaseFactory).to(DatabaseFactory);

//Bind Schema
container.bind<IBaseSchema>(SchemaType.IBaseSchema).to(BaseSchema);

//Bind Repository
container.bind<IGenericRepository<IEntityModel>>(RepositoryType.IGenericRepository).to(GenericRepository);
container.bind<IAuthorRepository>(RepositoryType.IAuthorRepository).to(AuthorRepository);

//Bind Service
container.bind<IEntityService<IEntityModel>>(ServiceType.IEntityService).to(EntityService);
container.bind<IAuthorService>(ServiceType.IAuthorService).to(AuthorService);

//Bind Controller
container.bind<RegistrableController>(ControllerType.IAuthorController).to(AuthorController);