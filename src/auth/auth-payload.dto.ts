import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field()
  name: string;

  @Field()
  role: string;
}
