import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { JwtModule } from "@nestjs/jwt";
import { join } from "path";
import { TodoModule } from "./todo/todo.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      playground: true,
      driver: ApolloDriver,
      context: ({ req }) => ({ req }),
    }),
    JwtModule.register({
      secret: "YOUR_SECRET_KEY",
      signOptions: { expiresIn: "60m" },
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    TodoModule,
    UserModule,
  ],
})
export class AppModule {}
