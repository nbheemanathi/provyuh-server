const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { RECIPE_API_KEY } = require("../../config");

module.exports = {
    Query: {
        async getRandomRecipes(_, { tags }) {
            try {
              const response = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${RECIPE_API_KEY}&number=12&tags=${tags.join(
                  ","
                )}`
              ).then((response) => response.json());
              return response.recipes;
            } catch (error) {
              throw new Error(error);
            }
          },
    }
}