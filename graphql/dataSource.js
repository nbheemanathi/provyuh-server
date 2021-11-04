const { RESTDataSource } = require("apollo-datasource-rest");

const ACCESS_KEY = "8695dcaaae0c4801b22afda4d5e82429";
const API_URL = "https://api.spoonacular.com/recipes/";

 class Recipe_API extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = API_URL;
  }

  willSendRequest(request) {
    request.params.set("apiKey", ACCESS_KEY);
  }

  async getRandomRecipesOnLimit(number, type, addRecipeNutrition, offset) {   
    const data = await this.get("complexSearch", { number, type, addRecipeNutrition, offset });
    return data;
  }
}
module.exports = {
    Recipe_API
}