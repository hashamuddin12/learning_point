const { users } = require("../models/userModel");

const getAllTeacher = async (req, res) => {
    try {
        const fetchTeacher = await users.find({
            role: "Teacher",
        });

        return res.status(200).send({
            success: true,
            message: "Fetch All teachers Successfully",
            totalUser: fetchTeacher.length,
            data: fetchTeacher,
        });
    } catch (e) {
        console.log(e);
        return res.status(400).send({
            success: false,
            message: "Something went wrong",
        });
    }
};

module.exports = { getAllTeacher };
