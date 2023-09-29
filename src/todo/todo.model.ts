import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/user.model";

export type TodoDocument = HydratedDocument<Todo>;

@ObjectType()
@Schema()
export class Todo {
  @Field() 
  readonly id: string;
  
  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ default: false })
  completed: boolean;

  @Field(type => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);