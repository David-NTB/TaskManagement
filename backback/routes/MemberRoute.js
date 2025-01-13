import express, { Router } from "express";
import {
    getMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
} from "../controllers/MemberController.js";

const router = express.Router();

router.get('/members', getMembers);
router.get('/members/:id', getMemberById);
router.post('/members', createMember);
router.patch('/members/:id', updateMember);
router.delete('/members/:id', deleteMember);

export default router;