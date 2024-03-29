import gql from 'graphql-tag';
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers/index.js";
import { user } from "./types/userType.js";
import { recipe } from "./types/recipeType.js";
import { misc } from "./types/miscType.js";
import { event } from "./types/eventType.js";
import { DateTimeTypeDefinition } from 'graphql-scalars';

const typeDefs = gql`
  type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post
    getUser(username: String!): User
    getRandomRecipesOnLimit(recipeInput: RecipeInput): RecipeResults
    getUserLikedRecipes(userId: String!): [RecipeInfo]
    getRecipeInformation(id: Int!): Recipe
    getUserEvents: [Event]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    saveUserRecipe(liked: Boolean, recipeId: Int!, title: String!, imageUrl: String): likeStatus!
    addEvent(eventInput: EventInput): Event!
  }
`;

export default makeExecutableSchema({
  typeDefs: [DateTimeTypeDefinition, typeDefs, user, recipe, misc, event],
  resolvers,
});
