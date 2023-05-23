import mongoose from "mongoose";
const { model, Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
  phone: String,
  createdAt: String,
});

export default  mongoose.models.User || mongoose.model('User', userSchema);

// export default model("User", userSchema);
