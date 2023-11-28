const express = require("express");
const app = express();
const authRoute = require('./routes/auth')
const indexRoute = require('./routes/index')
const port = 3000;

app.use(authRoute, indexRoute)

app.listen(port, (req, res) => {
    console.log(`listen to port: ${port}`);
});
