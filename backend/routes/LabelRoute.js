import express, { Router } from "express";
import {
    getLabels,
    getLabelById,
    createLabel,
    updateLabel,
    deleteLabel
} from "../controllers/LabelController.js";

const router = express.Router();

router.get('/labels', getLabels);
router.get('/labels/:id', getLabelById);
router.post('/labels', createLabel);
router.patch('/labels/:id', updateLabel);
router.delete('/labels/:id', deleteLabel);

export default router;