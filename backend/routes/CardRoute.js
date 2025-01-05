import express, { Router } from "express";
import {
    getCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard
} from "../controllers/CardController.js";

const router = express.Router();

router.get('/cards', getCards);
router.get('/cards/:id', getCardById);
router.post('/cards', createCard);
router.patch('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);

export default router;