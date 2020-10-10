const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://admin:jNflZsq86dHQkUwK@cluster0.zdiou.mongodb.net/Cluster0?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
