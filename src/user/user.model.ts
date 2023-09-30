import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Todo } from "src/todo/todo.model";

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema()
export class User {
  @Field()
  readonly id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  todosCount?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
