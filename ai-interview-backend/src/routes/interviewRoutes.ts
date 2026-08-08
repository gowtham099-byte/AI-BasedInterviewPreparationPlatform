import { Router } from "express";
import { getQuestions, submitAnswer } from "../controllers/interviewController";

const router = Router();

router.get("/questions", getQuestions);
router.post("/answer", submitAnswer);

export default router;