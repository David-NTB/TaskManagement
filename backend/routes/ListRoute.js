import express, { Router } from "express";
import {
    getLists,
    getListById,
    createList,
    updateList,
    deleteList
} from "../controllers/ListController.js";

const router = express.Router();

router.get('/lists', getLists);
router.get('/lists/:id', getListById);
router.post('/lists', createList);
router.patch('/lists/:id', updateList);
router.delete('/lists/:id', deleteList);

export default router;