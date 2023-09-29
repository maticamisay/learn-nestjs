import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput {
  @Field()
  title?: string;

  @Field({ nullable: true })
  completed?: boolean;

  @Field({ nullable: true })
  userId?: string;
}
