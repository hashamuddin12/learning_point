const express = require("express");
const adminRouter = express.Router();
const verifyAdmin = require("../middleware/verifyAdmin");

const {
    getAllTeacher, verifyTeacher
} = require("../controllers/adminController");

adminRouter.get("/api/getAllTeacher", [verifyAdmin], getAllTeacher);
adminRouter.patch("/api/verifyTeacher", [verifyAdmin], verifyTeacher);

module.exports = adminRouter;
