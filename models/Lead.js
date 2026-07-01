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

  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        if (ret.createdAt) {
          const d = new Date(ret.createdAt);
          ret.createdAtFormatted = d.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        }
        if (ret.updatedAt) {
          const d = new Date(ret.updatedAt);
          ret.updatedAtFormatted = d.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        }
        return ret;
      },
    },
  }
);

export default mongoose.model("Lead", leadSchema);