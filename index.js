const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs= require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require("./config");
const dotenv = require('dotenv');
const {Recipe_API} = require('./graphql/dataSource.js'); 
dotenv.config();
// const pubsub = new PubSub();
const PORT = process.env.PORT || 5000
const server = new ApolloServer({ typeDefs, resolvers,
  dataSources:() =>{
    return {
      recipeAPI: new Recipe_API()
    }
  },
  context: ({req}) => ({req})});
console.log(process.env.FOOD_API_URL)
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("data connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(res.url);
  })
  .catch(err => {
    console.error(err)
  })
