import mongoose from "mongoose";
const { model, Schema } = mongoose;

const roleSchema = new Schema({
  name:String
});


export default model("Role", roleSchema);
