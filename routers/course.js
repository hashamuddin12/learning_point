const express = require("express");
const courseRouter = express.Router();
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const upload = multer();
const { uploadCourse } = require("../controllers/courseController");

courseRouter.post(
  "/api/uploadCourse",
  [
    verifyToken,
    upload.fields([
      { name: "courseThumbnail", maxCount: 1 },
      { name: "material_1", maxCount: 1 },
      { name: "material_2", maxCount: 1 },
      { name: "material_3", maxCount: 1 },
    ]),
  ],
  uploadCourse
);

module.exports = courseRouter;
