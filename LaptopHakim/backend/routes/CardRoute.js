import express, { Router } from "express";
import {
    getAllCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard
} from "../controllers/CardController.js";

const router = express.Router();

router.get('/cards', getAllCards);
router.get('/cardList', getCardById);
router.post('/cards', createCard);
router.patch('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);

export default router;