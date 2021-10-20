const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

module.exports = {
    Query: {
        async getRandomRecipes(_, { tags }) {
            try {
              const response = await fetch(
                process.env.FOOD_API_URL+ `&number=12&tags=${tags.join(
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