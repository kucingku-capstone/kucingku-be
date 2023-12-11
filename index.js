const express = require("express");
const app = express();
const authRoute = require('./routes/auth')
const indexRoute = require('./routes/index');
const bodyParser = require("body-parser");
import FileUpload from "express-fileupload";
import cors from "cors";
import CatRoute from "./routes/CatRoute.js";
import UserInterestRoute from "./routes/userInterestRoute.js";

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(FileUpload());
app.use(express.static("public"));
app.use(authRoute, indexRoute, CatRoute, UserInterestRoute);

app.listen(port, (req, res) => {
    console.log(`listen to port: ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit();
})
