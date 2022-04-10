import  { RESTDataSource } from "apollo-datasource-rest";

// const ACCESS_KEY = "8695dcaaae0c4801b22afda4d5e82429";
const ACCESS_KEY = "553bb715ffac4d13ab7fe71e518c12ae";


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

  async getRandomRecipesOnLimit(number, type,cuisine, addRecipeNutrition, offset) {   
    const data = await this.get("complexSearch", { number, type,cuisine, addRecipeNutrition, offset });
    return data;
  }
  async getRecipeInformation(id,includeNutrition,instructionsRequired = true){
    const data = await this.get(`${encodeURIComponent(id)}/information`,{includeNutrition,instructionsRequired});
    return data;
  }
}
export {
    Recipe_API
}