import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },

    fatherName: {
      type: String,
      required: true,
    },
    nameType: {
      type: String,
      default: "Father",
    },

    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
    },

    course: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    internship: {
      type: String,
      default: "No",
    },

    internshipDuration: {
      type: String,
      default: "N/A",
    },

    issueDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Certificate",
  certificateSchema
);