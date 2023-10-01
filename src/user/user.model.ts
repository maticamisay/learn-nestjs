import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { RoleType } from "./role.model";

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
  @Prop({ required: true })
  password: string;

  @Field((type) => RoleType)
  @Prop({ type: String, enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Field()
  todosCount?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
