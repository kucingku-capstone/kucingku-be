import express from "express";
import {
    getCat,
    getCatById,
    saveCat,
    updateCat,
    deleteCat
} from "../handler/CatController.js";

const router = express.Router();

router.get('/Cat', getCat);
router.get('/Cat/:id', getCatById);
router.post('/Cat', saveCat);
router.patch('/Cat/:id', updateCat);
router.delete('/Cat/:id', deleteCat);

export default router;
