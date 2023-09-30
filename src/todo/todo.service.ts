import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.model';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findAllByUserId(userId: string): Promise<Todo[]> {
    return this.todoModel.find({ userId }).exec();
  }

  async findOneById(id: string): Promise<Todo> {
    return this.todoModel.findById(id).exec();
  }

  async create(input: CreateTodoInput): Promise<Todo> {
    const newTodo = new this.todoModel(input);
    return newTodo.save();
  }

  async update(id: string, input: UpdateTodoInput): Promise<Todo> {
    return this.todoModel.findByIdAndUpdate(id, input, { new: true }).exec();
  }

  async delete(id: string): Promise<Todo> {
    return this.todoModel.findByIdAndRemove(id).exec();
  }  
}