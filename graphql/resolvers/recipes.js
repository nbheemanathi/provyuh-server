const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const dotenv = require("dotenv").config();
module.exports = {
  Query: {
    async getRandomRecipes(_, { tags }) {
      try {
        const response = await fetch(
          process.env.FOOD_API_URL + `&number=12&tags=${tags.join(",")}`
        ).then((response) => response.json());
        return response.recipes;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getRandomRecipesOnLimit(_, { tag, number }, { dataSources }) {
      try {
        const data =  await dataSources.recipeAPI.getRandomRecipesOnLimit(number,tag).then((response) => response);
        return data.recipes;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
