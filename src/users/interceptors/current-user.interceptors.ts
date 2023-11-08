import {NestInterceptor, ExecutionContext, CallHandler, Injectable} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
constructor(private usersService: UsersService) {}
// context is like a wrapper on the incoming req and handler is the handler that will go after beeing intercepted
async intercept(context: ExecutionContext, handler: CallHandler){

const request = context.switchToHttp().getRequest();
const { userId } = request.session  || {};

if(userId){
const user = await this.usersService.findOne(userId)
// dergoja func qe eshte self made decorator
request.currentUser = user;
}
// go to handler
return handler.handle();
}
}