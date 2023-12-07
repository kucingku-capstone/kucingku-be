import express from "express";
import {
    getCat,
    getCatById,
    saveCat,
    updateCat,
    deleteCat
} from "../handler/CatHandler.js";
const authMiddleware = require('../middleware/index.js')

const router = express.Router();

//auth middlerware, only login user can access route below
router.use(authMiddleware);

router.get('/Cat', getCat);
router.get('/Cat/:id', getCatById);
router.post('/Cat', saveCat);
router.patch('/Cat/:id', updateCat);
router.delete('/Cat/:id', deleteCat);

export default router;
