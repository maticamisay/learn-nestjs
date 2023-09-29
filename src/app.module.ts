import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      driver: ApolloDriver,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://root:root2399@api-elit.p4wjvhc.mongodb.net/test-graphql',
    ),
    TodoModule,
    UserModule,
  ],
})
export class AppModule {}
