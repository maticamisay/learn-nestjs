import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import { Todo } from "./todo.model";
import { TodoService } from "./todo.service";
import { CreateTodoInput } from "./dto/create-todo.input";
import { UpdateTodoInput } from "./dto/update-todo.input";
import { User } from "src/user/user.model";
import { UserService } from "src/user/user.service";
import { AuthGuard } from "@nestjs/passport";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Resolver((of) => Todo)
export class TodoResolver {
  constructor(
    private todoService: TodoService,
    private userService: UserService
  ) {}

  @Query((returns) => [Todo], { name: "todos" })
  async getAllTodos(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Query((returns) => Todo)
  async getTodo(@Args("id") id: string): Promise<Todo> {
    return this.todoService.findOneById(id);
  }

  @ResolveField("userId", (returns) => User)
  async getUser(@Parent() todo: Todo): Promise<User> {
    return this.userService.findOne(todo.userId.toString());
  }

  @Mutation((returns) => Todo)
  @UseGuards(GqlAuthGuard)
  async createTodo(
    @Args("input") input: CreateTodoInput,
    @CurrentUser() user: User
  ): Promise<Todo> {
    return this.todoService.create(input);
  }

  @Mutation((returns) => Todo)
  async updateTodo(
    @Args("id") id: string,
    @Args("input") input: UpdateTodoInput
  ): Promise<Todo> {
    return this.todoService.update(id, input);
  }

  @Mutation((returns) => Todo)
  async deleteTodo(@Args("id") id: string): Promise<Todo> {
    return this.todoService.delete(id);
  }
}
