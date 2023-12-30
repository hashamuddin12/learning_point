const { courses } = require("../models/courseModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCourse = async (req, res) => {
    try {
        const material1Response = await cloudinary.uploader.upload(
            `data:image/png;base64,${req.files["material_1"][0].buffer.toString(
                "base64"
            )}`
        );

        let material2Response;
        if (req.files["material_2"]) {
            material2Response = await cloudinary.uploader.upload(
                `data:image/png;base64,${req.files["material_2"][0].buffer.toString(
                    "base64"
                )}`
            );
        }

        let material3Response
        if (req.files["material_3"]) {
            material3Response = await cloudinary.uploader.upload(
                `data:image/png;base64,${req.files["material_3"][0].buffer.toString(
                    "base64"
                )}`
            );
        }

        if (req.files["material_1"] && req.files["material_2"] && req.files["material_3"]) {
            const insertCourse = new courses({
                userId: req.user._id,
                courseTitle: req.body.courseTitle,
                courseDescription: req.body.courseDescription,
                material_1: `${material1Response.url}`,
                material_2: `${material2Response.url}`,
                material_3: `${material3Response.url}`,
                price: req.body.price
            });
            await insertCourse.save();
        } else if (req.files["material_1"] && req.files["material_2"] && !req.files["material_3"]) {
            const insertCourse = new courses({
                userId: req.user._id,
                courseTitle: req.body.courseTitle,
                courseDescription: req.body.courseDescription,
                material_1: `${material1Response.url}`,
                material_2: `${material2Response.url}`,
                price: req.body.price
            });
            await insertCourse.save();
        } else if (req.files["material_1"] && !req.files["material_2"] && !req.files["material_3"]) {
            const insertCourse = new courses({
                userId: req.user._id,
                courseTitle: req.body.courseTitle,
                courseDescription: req.body.courseDescription,
                material_1: `${material1Response.url}`,
                price: req.body.price
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

module.exports = { uploadCourse };