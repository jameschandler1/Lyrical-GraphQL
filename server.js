const express = require("express");
const mongoose = require("mongoose");
const schema = require("./server/schema/schema");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000; // get the port from the .env filename
const HOST = "localhost";

const db = mongoose.createConnection(url); // open the connection to the database
db.on("error", (err) => {
  console.log(err);
});
db.on("connected", () => {
  console.log("connected to the database");
});

const server = new ApolloServer("/graphql", {
  typeDefs,
  resolvers,
  csrfPrevention: true,
  graphiql: true,
}); // create the server instanceof ApolloServer class

const app = express();
app.use(bodyParser.json());
app.use(cors());
server.applyMiddleware({ app }); // apply the middleware to the server
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://${HOST}:${PORT}${server.graphqlPath}`);
});



module.exports = app;
