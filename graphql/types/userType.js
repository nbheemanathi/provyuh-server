import { gql } from "apollo-server";

export const user = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    userSavedRecipes:[RecipeInfo]
  }
  type userRecipe {
    user: ID
    id: ID
    recipes: [RecipeInfo]
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
`;
