import { Request, Response } from "express";

export class InterviewController {
    async getQuestions(req: Request, res: Response): Promise<void> {
        // Logic to retrieve interview questions
        res.status(200).json({ message: "Questions retrieved successfully." });
    }

    async submitResponse(req: Request, res: Response): Promise<void> {
        // Logic to submit user response
        res.status(201).json({ message: "Response submitted successfully." });
    }

    async getFeedback(req: Request, res: Response): Promise<void> {
        // Logic to provide feedback based on user responses
        res.status(200).json({ message: "Feedback retrieved successfully." });
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