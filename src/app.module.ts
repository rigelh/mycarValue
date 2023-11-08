import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
// importojm typeOrm
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/reports.entity';

// importojme per te bere nje pipe globale
import {ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

// importojme per te bere set cookie session si global middleware
import {MiddlewareConsumer } from '@nestjs/common';
const cookieSession = require('cookie-session');

//dotnev config
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  //perdorim configmodule
  imports: [
    ConfigModule.forRoot({
      // this makes it global so we dont make the same in each sub module.
isGlobal:true,
envFilePath: `.env.${process.env.NODE_ENV}`, // shiko rregullimet ne package.json
    }),
    //lidhja e databazes 
    TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return {
        type: 'sqlite',
        database: config.get<string>('DB_NAME'),
        host: 'localhost',
        entities: [User, Report],
        synchronize: true,
      }
    }
    }),
    UsersModule,
    ReportsModule],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
    })
  }],
})
export class AppModule {
configure(consumer: MiddlewareConsumer){

consumer.apply(cookieSession({
  keys: ['asdfasfad']
})).forRoutes('*');

  }
}
//    TypeOrmModule.forRoot({
  //      type:'sqlite',
  //      database: 'db.sqlite',
  //      entities: [User, Reports],
  //      synchronize: true,
  // }),
