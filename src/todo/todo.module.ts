import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './todo.model';
import { TodoService } from './todo.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  providers: [TodoResolver, TodoService],
})
export class TodoModule {}
