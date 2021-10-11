const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
    Query: {
        async getRandomRecipes(_, { tags }) {
            try {
              const response = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=8695dcaaae0c4801b22afda4d5e82429&number=10&tags=${tags.join(
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