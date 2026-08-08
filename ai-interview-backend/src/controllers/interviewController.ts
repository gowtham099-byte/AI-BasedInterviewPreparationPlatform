import { Request, Response } from "express";
import { AIService } from "../services/aiService";
import fs from "fs/promises";
import path from "path";

type QuestionShape = { id: number; questionText: string; options?: string[] };

const sampleQuestions: QuestionShape[] = [
  { id: 1, questionText: "Explain the difference between let, const, and var in JavaScript." },
  { id: 2, questionText: "What is closure in JavaScript? Provide an example." },
  { id: 3, questionText: "Describe the component lifecycle in React (hooks-based approach)." }
];

const answersFile = path.join(__dirname, "..", "..", "data", "answers.json");
const aiService = new AIService();

async function ensureAnswersFile() {
  try {
    await fs.mkdir(path.dirname(answersFile), { recursive: true });
    await fs.access(answersFile).catch(async () => {
      await fs.writeFile(answersFile, JSON.stringify([]), "utf-8");
    });
  } catch (err) {
    // ignore - best effort
    console.error("ensureAnswersFile error", err);
  }
}

export class InterviewController {
  async getQuestions(_req: Request, res: Response): Promise<void> {
    // Return sample questions so the frontend can display them
    res.status(200).json({ questions: sampleQuestions });
  }

  async submitResponse(req: Request, res: Response): Promise<void> {
    const { questionId, answer } = req.body ?? {};
    if (!questionId || typeof answer !== "string" || answer.trim() === "") {
      res.status(400).json({ error: "questionId and answer are required." });
      return;
    }

    // Persist the answer to a local JSON file (simple persistence for demo)
    try {
      await ensureAnswersFile();
      const raw = await fs.readFile(answersFile, "utf-8");
      const arr = JSON.parse(raw || "[]");
      const entry = {
        id: arr.length + 1,
        questionId,
        answer,
        createdAt: new Date().toISOString(),
      };
      arr.push(entry);
      await fs.writeFile(answersFile, JSON.stringify(arr, null, 2), "utf-8");

      // Call AI service to analyze the single answer (placeholder implementation)
      const feedback = await aiService.analyzeResponses([answer]);

      res.status(201).json({ message: "Response submitted successfully.", feedback });
    } catch (err) {
      console.error("submitResponse error", err);
      res.status(500).json({ error: "Failed to save response." });
    }
  }

  async getFeedback(_req: Request, res: Response): Promise<void> {
    // For demo purposes, return a static message or last computed feedback could be stored
    res.status(200).json({ feedback: "Your responses show a good understanding of the topics." });
  }
}

const controller = new InterviewController();

export const getQuestions = async (req: Request, res: Response): Promise<void> => {
  await controller.getQuestions(req, res);
};

export const submitAnswer = async (req: Request, res: Response): Promise<void> => {
  await controller.submitResponse(req, res);
};

export const getFeedback = async (req: Request, res: Response): Promise<void> => {
  await controller.getFeedback(req, res);
};
