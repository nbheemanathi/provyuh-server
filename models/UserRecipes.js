import mongoose from 'mongoose';
const {model, Schema } = mongoose;

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
export default model("UserRecipe", userRecipeSchema);