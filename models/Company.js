import mongoose from "mongoose";
const { model, Schema } = mongoose;

const companySchema = new Schema({
  name:String,
  createdAt: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  addLink: String,
  onboardingPassword: String, 
});


export default model("Company", companySchema);
