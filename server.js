const express = require("express");
const mongoose = require("mongoose");
const schema = require("./server/schema/schema");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const dotenv = require("dotenv");
const { functions } = require("lodash");

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

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    req,
    db: mongoose.connection,
  }),
}); // create the server instanceof ApolloServer class

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://${HOST}:${PORT}${server.graphqlPath}`);
});

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");

((webpackConfig) => {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        reject(err);
        console.log(reject(err));
      } else if (stats.hasErrors()) {
        reject(new Error(stats.toString()));
        console.log(reject(new Error(stats.toString())));
      } else {
        resolve();
      }
    });
  });
})

module.exports = app;
