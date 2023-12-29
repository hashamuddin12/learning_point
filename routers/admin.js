const express = require("express");
const adminRouter = express.Router();
const verifyAdmin = require("../middleware/verifyAdmin");

const {
    getAllTeacher, verifyTeacher, getAllStudent
} = require("../controllers/adminController");

adminRouter.get("/api/getAllTeacher", [verifyAdmin], getAllTeacher);
adminRouter.get("/api/getAllStudent", [verifyAdmin], getAllStudent);
adminRouter.patch("/api/verifyTeacher", [verifyAdmin], verifyTeacher);

module.exports = adminRouter;
