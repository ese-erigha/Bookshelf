import { AuthorSchema } from './../../model/index';
import { ModelTypes } from './../../model/modelTypes';
import { IEntityModel } from '../../model/entity/interfaces/index';
import {injectable} from 'inversify';
import { IDatabaseFactory } from '../interfaces/IDatabaseFactory';
import { Mongoose, Model, Connection,Schema} from "mongoose";
import {AppConfig} from '../../utils/config';
import { IAuthorModel } from '../../model/entity/interfaces/index';


@injectable()
export class DatabaseFactory implements IDatabaseFactory{

    constructor(){

    }

    /***
     * returns a database set (dbSet) of the passed schema
     * 
     * @class DatabaseFactory
     * @method connect
     * 
     * @param schemaName - Name of the schema - string
     * 
     ***/

    public async connect(schemaName: string): Promise<Model<IEntityModel>>{

        let connection: Connection = await this.getConnection();
        return this.getModel(schemaName,connection);
    }

    private async getConnection() :Promise<Connection>{
        
        //let mongoose = new Mongoose(AppConfig.dbUrl);
        let mongoose = await new Mongoose().connect(AppConfig.dbUrl);
        (<any>mongoose).Promise = global.Promise;
        const connection: Connection =  await mongoose.connection;
        console.log("got here!!!");
        console.log("connection state: "+connection.readyState);
        return connection;
    }

    private getModel(schemaName: string,connection: Connection): Model<IEntityModel>{

        let model: Model<IEntityModel>;
        let schema: Schema;

        switch(schemaName){

            case ModelTypes.Author:
                schema = new AuthorSchema().getSchema();
                model = connection.model<IAuthorModel>(schemaName,schema,schemaName);
                
                break;

            default:
                break;
        }

        return model;
    }
}