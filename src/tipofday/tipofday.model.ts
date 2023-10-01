import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

export type TipOfDayDocument = HydratedDocument<TipOfDay>;

@ObjectType()
@Schema()
export class TipOfDay {
  @Field()
  readonly id: string;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field()
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TipOfDaySchema = SchemaFactory.createForClass(TipOfDay);
