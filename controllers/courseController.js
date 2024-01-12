const { courses } = require("../models/courseModel");
const { applyCourse } = require("../models/applyCourse");
const cloudinary = require("cloudinary").v2;
const { users } = require("../models/userModel");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 600000,
});
const { courseUploadValidate } = require("../validations/course");

const uploadCourse = async (req, res) => {
  try {
    const { error } = courseUploadValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).send({
        status: 400,
        message: error.details[0].message,
      });
    }
    const checkUser = await users
      .findOne({ _id: req.user._id })
      .select({ role: 1 });
    if (checkUser.role !== "Teacher") {
      return res.status(400).send({
        success: false,
        message: "Only Teacher can Upload a course",
      });
    }

    if (!req.files["courseThumbnail"]) {
      return res.status(400).send({
        success: false,
        message: "Please Upload Course Thumbnail",
      });
    }

    if (!req.files["material_1"]) {
      return res.status(400).send({
        success: false,
        message: "Please Upload Atleast One Video",
      });
    }
    const courseThumbnail = await cloudinary.uploader.upload(
      `data:image/png;base64,${req.files["courseThumbnail"][0].buffer.toString(
        "base64"
      )}`
    );

    const material1Response = await cloudinary.uploader.upload(
      `data:video/mp4;base64,${req.files["material_1"][0].buffer.toString(
        "base64"
      )}`,
      { resource_type: "video" }
    );

    if (req.files["material_1"]) {
      const insertCourse = new courses({
        userId: req.user._id,
        courseTitle: req.body.courseTitle,
        courseDescription: req.body.courseDescription,
        material_1: `${material1Response.url}`,
        price: req.body.price,
        courseThumbnail: `${courseThumbnail.url}`,
      });
      await insertCourse.save();
    } else {
      return res.status(400).send({
        success: false,
        message: "Something went wrong on Uploading on Course",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Course Uploaded Successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const fetchAllCourses = async (req, res) => {
  try {
    const getAllCourses = await courses.find();

    return res.status(200).send({
      success: true,
      message: "Fetch All Courses Successfully",
      data: getAllCourses,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const fetchTeacherKPI = async (req, res) => {
  try {
    const getTeacherCourse = await courses
      .find({ userId: req.user._id })
      .select({ _id: 1 });
    const getTeacherStudents = await applyCourse
      .find({ teacherId: req.user._id })
      .select({ _id: 1 });

    return res.status(200).send({
      success: true,
      message: "Fetch Teacher KPI Successfully",
      data: {
        totalCourse: getTeacherCourse.length,
        totalStudents: getTeacherStudents.length,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { uploadCourse, fetchAllCourses, fetchTeacherKPI };
