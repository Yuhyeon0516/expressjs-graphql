const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const port = 4000;

const loadedFiles = loadFilesSync("**/*", {
  extensions: ["graphql"],
});

const schema = makeExecutableSchema({
  typeDefs: loadedFiles,
  resolvers: {
    Query: {
      posts: async (parent, args, context, info) => {
        const product = Promise.resolve(parent.posts);
        return product;
      },
      comments: async (parent) => {
        const comment = Promise.resolve(parent.comments);
        return comment;
      },
    },
  },
});

const root = {
  posts: require("./posts/posts.model"),
  comments: require("./comments/comments.model"),
};

app.use(
  `/graphql`,
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
});
