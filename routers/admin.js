const express = require("express");
const adminRouter = express.Router();
const verifyAdmin = require("../middleware/verifyAdmin");

const {
    getAllTeacher,
} = require("../controllers/adminController");

adminRouter.get("/api/getAllTeacher", [verifyAdmin], getAllTeacher);

module.exports = adminRouter;
