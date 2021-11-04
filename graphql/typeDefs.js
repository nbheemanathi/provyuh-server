const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Ingredients {
    id: Int
    aisle: String
    image: String
    name: String
    amount: Float
    unit: String
  }
  type Nutrients{
    name: String
    title:String
    amount: Float
    unit: String
  }
  type ExtendedInfo{
    nutrients:[Nutrients]
    ingredients:[Ingredients]
  }
  type InstructionSteps{
    number:Int
    step:String
  }
  type Instructions{
    steps:[InstructionSteps]
  }
  type Recipe{
    id:ID
    title: String
    summary: String
    servings: Int
    readyInMinutes: Int
    image: String
    imageType: String
    dairyFree:Boolean
    vegan:Boolean    
    vegetarian:Boolean
    healthScore:Int
    occasions:[String]
    creditsText:String
    dishTypes:[String]
    diets:[String]
    nutrition:ExtendedInfo
    analyzedInstructions:[Instructions]
  }
  type RecipeResults{
    results:[Recipe]
    totalResults:Int
    offset:Int
  }
  type RecipeInfo{
      recipeId:Int
      title:String
      imageUrl:String
    }
  type userRecipe{
    user:ID,
    id:ID,
    recipes:[RecipeInfo]
  }

  type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post
    getUser(username:String!):User
    getRandomRecipesOnLimit(type:String!, number:Int!, offset:Int!, addRecipeNutrition:Boolean):RecipeResults
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    saveUserRecipe(recipeId: Int!, title:String!, imageUrl:String): userRecipe!
  }
`;
