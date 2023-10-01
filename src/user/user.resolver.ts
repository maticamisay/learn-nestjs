import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from "@nestjs/graphql";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { TodoService } from "src/todo/todo.service";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AuthPayload } from "src/auth/auth-payload.dto";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private todoService: TodoService,
    private authService: AuthService
  ) {}

  @Mutation((returns) => User)
  async createUser(@Args("input") input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }

  @Query((returns) => [User], { name: "users" })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query((returns) => User, { name: "user" })
  async findOne(@Args("id") id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation((returns) => User)
  async updateUser(
    @Args("id") id: string,
    @Args("input") input: UpdateUserInput
  ): Promise<User> {
    return this.userService.update(id, input);
  }

  @Mutation((returns) => User)
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args("id") id: string): Promise<User> {
    return this.userService.remove(id);
  }

  @ResolveField("todosCount", (returns) => Number)
  async getTodosCount(@Parent() user: User): Promise<number> {
    const todos = await this.todoService.findAllByUserId(user.id);
    return todos.length;
  }

  @Mutation((returns) => AuthPayload)
  async login(
    @Args("name") name: string,
    @Args("password") password: string
  ): Promise<AuthPayload> {
    const user = await this.authService.validateUser(name, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const loginData = await this.authService.login(user);
    console.log(loginData);
    return loginData;
  }
}
