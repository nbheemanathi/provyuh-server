const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const dotenv = require("dotenv").config();
module.exports = {
  Query: {
    async getRandomRecipes(_, { tags }) {
      const tag = tags[0];
      const url =
        "https://api.spoonacular.com/recipes/random?apiKey=8695dcaaae0c4801b22afda4d5e82429&number=12&tags=" +
        tag;

      console.log(url);
      try {
        const response = await fetch(url).then((response) => {
          console.log(response);
          return response.json();
        });
        console.log(response)
        return response.recipes;
      } catch (error) {
        console.log(error)
        throw new Error(error);
      }
    },
  },
};
