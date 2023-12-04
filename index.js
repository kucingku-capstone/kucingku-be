const express = require("express");
const app = express();
const authRoute = require('./routes/auth')
const indexRoute = require('./routes/index');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoute, indexRoute)

app.listen(port, (req, res) => {
    console.log(`listen to port: ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit();
})