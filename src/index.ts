var morgan = require('morgan');
require('dotenv').config();
var winston = require('./utils/winston.js');
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as Bluebird from "bluebird";
declare global { export interface Promise<T> extends Bluebird<T> {} }

//import TYPES from './types';
//import container from './inversify.config';
//import {RegistrableController} from './controller/RegisterableController';

// create express application
const app: express.Application = express();
// let express support JSON bodies
app.use(bodyParser.json());
app.use(morgan('combined', { stream: winston.stream }));

// grabs the controller from IoC container and registers all the endpoints
//const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
//controllers.forEach(controller => controller.register(app));

// setup express middleware logging and error handling
app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // add this line to include winston logging
    winston.error(`${err.stack || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next(err);
});

app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(500).send('Internal Server Error');
});

app.listen(process.env.PORT, function () {
    winston.info('Example app listening on port 3000!');
});