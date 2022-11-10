import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpErrorFilter } from './shared/http-error.filter';
import { ValidationPipe } from './shared/validation.pipe';
import { UserEntity } from './user/user.entity';
import { TodoEntity } from './todo/todo.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "postgres_db",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "demo",
    synchronize: true,
    logging: true,
    entities: [UserEntity, TodoEntity],
    subscribers: [],
    migrations: [],
  }), TodoModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
