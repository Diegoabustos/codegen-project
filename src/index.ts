import { Todo } from "./types/types";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";

const schema = loadSchemaSync("**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const resolvers = {
  Query: {
    todos: (): Todo[] => todos,
  },
};

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const server = new ApolloServer({ schema: schemaWithResolvers });server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

const todos: Todo[] = [
  {
    title: "Walk dog",
    description: "Before 9am",
  },
  {
    title: "Clean bathroom",
    description: "",
  },
];
