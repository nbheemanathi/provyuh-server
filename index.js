import { ApolloServer } from "apollo-server";
import  mongoose from "mongoose";
import schema from './graphql/schema.js';
import resolvers from './graphql/resolvers/index.js';
import config from "./config.js";
import dotenv from 'dotenv';
import {Recipe_API} from './graphql/dataSource.js'; 
dotenv.config();
const PORT = process.env.PORT || 5000
const server = new ApolloServer({ schema,
  dataSources:() =>{
    return {
      recipeAPI: new Recipe_API()
    }
  },
  context: ({req}) => ({req})});
mongoose
  .connect(config.MONGODB, { useNewUrlParser: true })
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
