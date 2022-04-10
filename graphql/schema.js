import { gql } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers/index.js";
import { user } from "./types/userType.js";
import { recipe } from "./types/recipeType.js";
import { misc } from "./types/miscType.js";

const typeDefs = gql`
  type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post
    getUser(username: String!): User
    getRandomRecipesOnLimit(recipeInput: RecipeInput): RecipeResults
    getUserLikedRecipes(userId: String!): [RecipeInfo]
    getRecipeInformation(id:Int!):Recipe
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    saveUserRecipe(liked:Boolean, recipeId: Int!, title: String!, imageUrl: String): likeStatus!
  }
`;

export default makeExecutableSchema({
  typeDefs: [typeDefs, user, recipe, misc],
  resolvers,
});
