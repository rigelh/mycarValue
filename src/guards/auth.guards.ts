import {
  CanActivate,
  ExecutionContext
} from '@nestjs/common';


export class AuthGuard implements CanActivate {

  canActivate(context: ExecutionContext){
    // catch the requst and get that userId
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  }
}