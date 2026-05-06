import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
     
    },       
    message: {
      type: String,
  
    },
    course: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      default: "popup",
    },
    status: {
      type: String,
      default: "pending",
    },
  },

  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);