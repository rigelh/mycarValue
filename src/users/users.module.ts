import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// importojm typeorm 
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './user.entity';
import { AuthService } from './auth.service';
// current user Middleware
import {MiddlewareConsumer } from '@nestjs/common';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  // ky rrjeshti i imports ben te mundur krijimin e repositorit per user-in
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService, 
    AuthService]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer){

    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
  
}
