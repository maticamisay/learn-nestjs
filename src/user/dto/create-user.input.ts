import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  role: string;
}
