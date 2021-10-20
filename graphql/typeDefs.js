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
  type ExtendedIngredients {
    id: Int
    aisle: String
    image: String
    name: String
    amount: Float
    unit: String
  }
  type Recipe{
    id:ID
    title: String
    summary: String
    image: String
    imageType: String
    dairyFree:Boolean
    vegan:Boolean
    servings: Int
    readyInMinutes: Int
    vegetarian:Boolean
    healthScore:Int
    instructions:String
    occasions:[String]
    creditsText:String
    dishTypes:[String]
    diets:[String]
    extendedIngredients:[ExtendedIngredients]
  }

  type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post
    getUser(username:String!):User
    getRandomRecipes(tags:[String]!):[Recipe]
    getRandomRecipesOnLimit(tag:String!, number:Int!):[Recipe]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;
