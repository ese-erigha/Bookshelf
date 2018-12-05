import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import {Request,Response,NextFunction} from 'express';
import {HttpException,HttpStatus} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenValidationMiddleware implements NestMiddleware {
  async resolve(...args: any[]): Promise<MiddlewareFunction> {

    let that = this;
    return async (req: Request , res: Response, next: NextFunction) => {

      let token = req.header("Authorization");
      if(token){

        token = token.split(" ")[1];
        let isValidToken = await this.validateToken.call(that,token);
        if(isValidToken){
          
          req['token'] = token;
          next();
        }else{
          throw new HttpException("Authorization failed for this request",HttpStatus.BAD_REQUEST);
        } 
      }else{
        throw new HttpException("Authorization failed for this request",HttpStatus.BAD_REQUEST);
      }
    };
  }

  async validateToken(token): Promise<any>{

     return new Promise((resolve,reject)=>{

        jwt.verify(token,`${process.env.SECRET_KEY}`,(err,decoded)=>{
            
            if(err){
              resolve(false);
            }
            resolve(true);
        });
     }); 
  }
}