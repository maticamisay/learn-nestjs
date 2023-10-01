import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RoleDocument = Document & Role;

export enum RoleType {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
}

registerEnumType(RoleType, {
  name: "RoleType",
  description: "Different types of roles available",
});

@ObjectType()
@Schema()
export class Role {
  @Field((type) => RoleType)
  @Prop({ enum: RoleType, required: true })
  name: RoleType;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
