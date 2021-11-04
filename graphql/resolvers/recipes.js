const UserRecipes = require("../../models/UserRecipes");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const dotenv = require("dotenv").config();
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getRandomRecipesOnLimit(
      _,
      { type, number, addRecipeNutrition, offset },
      { dataSources }
    ) {
      try {
        const data = await dataSources.recipeAPI
          .getRandomRecipesOnLimit(number, type, addRecipeNutrition, offset)
          .then((response) => response);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async saveUserRecipe(_, { recipeId, title, imageUrl }, context) {
      const user = checkAuth(context);
      const result = await UserRecipes.findOneAndUpdate(
        { user: user.id },
        {
          $push: {
            recipes: {
              title,
              imageUrl,
              recipeId,
            },
          },
        },
        { upsert: true },
        { new: true }
      );
      return result;
    },
  },
};
