const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

module.exports = {
    Query: {
        async getRandomRecipes(_, { tags }) {
            try {
              const response = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=8695dcaaae0c4801b22afda4d5e82429&number=12&tags=${tags.join(
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