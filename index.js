const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;
require("./config/database");
const authRouter = require("./routers/auth");
const adminRouter = require("./routers/admin");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.use([authRouter, adminRouter]);

app.listen(port, () => {
  console.log(
    `Our Server is running at port ${port} in Development Environment`
  );
});
