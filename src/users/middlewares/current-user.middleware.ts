import { Injectable, NestMiddleware } from '@nestjs/common';
import {Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

declare global { 
  namespace Express{
   interface Request {
    // the request may have a currentUser and if it has give it an instance of user entity
    currentUser?: User;
   } 
  }
 }

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService){}
async use(req: Request, res: Response, next: NextFunction){

const {userId} = req.session  || {};

if (userId){
  const user = await this.usersService.findOne(userId);

  req.currentUser = user;
}
next();
//next() is a javascript method which tells teh middleware to mve from the middleware after its done
}
}