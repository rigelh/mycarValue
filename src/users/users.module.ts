import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// importojm typeorm 
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './user.entity';
import { AuthService } from './auth.service';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';


@Module({
  // ky rrjeshti i imports ben te mundur krijimin e repositorit per user-in
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService, 
    AuthService,
    // global scoped interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }]
})
export class UsersModule {}
