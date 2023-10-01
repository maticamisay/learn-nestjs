import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { User, UserDocument } from "./user.model";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { TodoService } from "src/todo/todo.service";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private todoService: TodoService
  ) {}

  async create(input: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = new this.userModel({ ...input, password: hashedPassword });
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByUsername(name: string): Promise<User> {
    const user = this.userModel.findOne({ name });
    return user;
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    if (input.password) {
      input.password = await bcrypt.hash(input.password, 10);
    }
    return this.userModel.findByIdAndUpdate(id, input, { new: true }).exec();
  }

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (user) {
      await this.todoService.removeTodosByUserId(id);
      await user.deleteOne();
      return user;
    }
    throw new Error("User not found");
  }

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.findByUsername(username);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) {
      throw new BadRequestException("Invalid credentials");
    }

    return user;
  }
}
