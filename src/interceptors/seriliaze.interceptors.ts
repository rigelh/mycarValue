// custom class sterializer interceptor in nestJS
import { 
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import {Observable,} from 'rxjs';
import { map } from 'rxjs';
import { plainToInstance } from 'class-transformer';

interface ClassContructor {
  // The arg inside the custom decorator should always be a class ==> 
  new(...args: any[]): {};
}

// CUSTOM DECORATOR
export function Seriliaze(dto: ClassContructor){
  //the custom decorator replaces this dto ==>
  return UseInterceptors( new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {

constructor (private dto:any){}


intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
// run smth before a request is handled be req handler

// -------------------------------------
return handler.handle().pipe(map((data:any)=>{
// run smth before the response is sent out run the custom class seriliazer
  return plainToInstance(this.dto, data , { 
    excludeExtraneousValues: true, // show the data which are follod by the decoraot expose in the userdto
  })
}))

}

}