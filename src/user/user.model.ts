import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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
