import { AuthorSchema } from './../../model/index';
import { ModelTypes } from './../../model/modelTypes';
import { IEntityModel } from '../../model/interfaces/IEntityModel';
import {injectable} from 'inversify';
import { IDatabaseFactory } from '../interfaces/IDatabaseFactory';
import { Mongoose, Model, Connection,Schema} from "mongoose";
import {AppConfig} from '../../utils/config';
import { IAuthorModel } from 'model/interfaces/IAuthorModel';
import 'reflect-metadata';



@injectable()
export class DatabaseFactory implements IDatabaseFactory{

    /***
     * returns a database set (dbSet) of the passed model
     * 
     * @class DatabaseFactory
     * @method connect
     * 
     * @param schemaName - Name of the schema - string
     * 
     ***/

    public connect(schemaName: string): Model<IEntityModel>{

        let connection: Connection = this.getConnection();
        return this.getModel(schemaName,connection);
    }

    private getConnection() :Connection{
        let mongoose = new Mongoose(AppConfig.dbUrl);
        (<any>mongoose).Promise = require("bluebird");
        const connection: Connection = mongoose.connection;
        return connection;
    }

    private getModel(schemaName: string,connection: Connection): Model<IEntityModel>{

        let model: Model<IEntityModel>;
        let schema: Schema;

        switch(schemaName){

            case ModelTypes.Author:
                schema = new AuthorSchema().getSchema();
                model = connection.model<IAuthorModel>(schemaName,schema);
                break;

            default:
                break;
        }

        return model;
    }
}