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

    grade: {
      type: String,
      required: true,
    },

    issueDate: {
      type: String,
      required: true,
    },

    serialNumber: {
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