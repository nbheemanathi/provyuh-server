import UserRecipes from "../../models/UserRecipes.js";
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
import dotenv from "dotenv";
import checkAuth from "../../util/check-auth.js";
dotenv.config();

export default {
  Query: {
    async getRandomRecipesOnLimit(
      _,
      { recipeInput: { cuisine, type, number, addRecipeNutrition, offset, user } },
      { dataSources }
    ) {
      try {
        const data = await dataSources.recipeAPI
          .getRandomRecipesOnLimit(number, type, cuisine, addRecipeNutrition, offset)
          .then((response) => response);

        const userRecipes = await UserRecipes.findOne({ user }).select("recipes -_id");
        const selectedRecipes = userRecipes?.recipes || [];

        if (!selectedRecipes.length) {
          return data;
        } else {
          const results = await data.results.map((item) => {
            const selectedRecipeIndex = selectedRecipes.findIndex(
              (recipe) => recipe.recipeId === item.id
            );
            return Object.assign(item, { liked: selectedRecipeIndex > -1 ? true : false });
          });
          Object.assign(data, { results });
          return data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getUserLikedRecipes(_, { userId }, context) {
      const response = await UserRecipes.findOne({ user : userId});
      return response.recipes;
    },
  },
  Mutation: {
    async saveUserRecipe(_, { liked, recipeId, title, imageUrl }, context) {
      const user = checkAuth(context);
      const result = await UserRecipes.findOneAndUpdate(
        { user: user.id },
        liked
          ? {
              $push: {
                recipes: {
                  title,
                  imageUrl,
                  recipeId,
                },
              },
            }
          : {
              $pull: {
                recipes: {
                  recipeId,
                },
              },
            },
        { upsert: true, new: true }
      );
      return {
        recipeId,
        title,
        imageUrl,
        status: liked,
      };
    },
  },
};
