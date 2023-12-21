import express from 'express';
import FileUpload from 'express-fileupload';
import cors from 'cors';
import CatRoute from './routes/CatRoute.js';
import UserInterestRoute from './routes/userInterestRoute.js';
import userRoute from './routes/usersRoute.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(FileUpload());
app.use(express.static('public'));
app.use(CatRoute, UserInterestRoute, userRoute);

app.listen(port, () => {
    console.log(`listen to port: ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit();
});
