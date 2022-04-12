import { gql } from "apollo-server";

export const recipe = gql`
  type Ingredients {
    id: Int
    aisle: String
    image: String
    name: String
    amount: Float
    unit: String
  }
  type Nutrients {
    name: String
    title: String
    amount: Float
    unit: String
  }
  type ExtendedInfo {
    nutrients: [Nutrients]
    ingredients: [Ingredients]
  }
  type InstructionSteps {
    number: Int
    step: String
  }
  type Instructions {
    steps: [InstructionSteps]
  }

  type Recipe {
    id: ID
    title: String
    summary: String
    servings: Int
    readyInMinutes: Int
    image: String
    imageType: String
    dairyFree: Boolean
    vegan: Boolean
    vegetarian: Boolean
    healthScore: Int
    occasions: [String]
    creditsText: String
    dishTypes: [String]
    diets: [String]
    nutrition: ExtendedInfo
    analyzedInstructions: [Instructions]
    liked: Boolean
  }
  type RecipeResults {
    results: [Recipe]
    totalResults: Int
    offset: Int
  }
  type RecipeInfo {
    recipeId: Int
    title: String
    imageUrl: String
  }
  type likeStatus {
    status: String
    recipeId: Int
    title: String
    imageUrl: String
  }
  input RecipeInput {
    type: String
    cuisine: String
    query:String
    number: Int
    offset: Int
    addRecipeNutrition: Boolean
    user: String
  }
`;
