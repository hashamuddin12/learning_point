const express = require("express");
const courseRouter = express.Router();
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const upload = multer();
const {
  uploadCourse,
  fetchAllCourses,
  fetchTeacherKPI,
} = require("../controllers/courseController");

courseRouter.post(
  "/api/uploadCourse",
  [
    verifyToken,
    upload.fields([
      { name: "courseThumbnail", maxCount: 1 },
      { name: "material_1", maxCount: 1 },
    ]),
  ],
  uploadCourse
);

courseRouter.get("/api/fetchAllCourses", [verifyToken], fetchAllCourses);
courseRouter.get("/api/fetchTeacherKPI", [verifyToken], fetchTeacherKPI);

module.exports = courseRouter;
