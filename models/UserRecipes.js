const { model, Schema } = require("mongoose");
const userRecipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  recipes: [
    {
      recipeId: Number,
      title: String,
      imageUrl: String,
    },
  ],
});

module.exports = model("UserRecipe", userRecipeSchema);
