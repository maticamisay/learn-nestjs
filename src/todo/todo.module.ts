import { Module, forwardRef } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './todo.model';
import { TodoService } from './todo.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule), MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  providers: [TodoResolver, TodoService],
  exports: [TodoService]
})
export class TodoModule { }
