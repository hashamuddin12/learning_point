const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    courseTitle: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    courseThumbnail: {
      type: String,
      required: true,
    },
    material_1: {
      type: String,
      required: true,
    },
    material_2: {
      type: String,
      required: false,
      default: null,
    },
    material_3: {
      type: String,
      required: false,
      default: null,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const courses = new mongoose.model("course", courseSchema);

module.exports = { courses };
