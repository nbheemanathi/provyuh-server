import mongoose from "mongoose";
const { model, Schema } = mongoose;



const eventSchema = new Schema({
  title: String,
  allDay: Boolean,
  start: Date,
  end: Date,
  type: String,
  notes: String,
  links: [{
    linkId:Number,
    imageUrl:String,
    title:String,
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  recurring: {
    type: String,
    parent: { type: Schema.Types.ObjectId, ref: "Event" },
  },
  guests: [{ type: Schema.Types.ObjectId, ref: "users" }],
});

export default model("Event", eventSchema);
