import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateTipOfDayInput {
  @Field()
  title: string;

  @Field()
  description: string;
}
