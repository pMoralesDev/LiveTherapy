import express, { Request, Response } from 'express';
import { LogInfo, LogError } from '../utils/logger';
import { QuestionController } from '@/controller/questionController';

const questionRouter = express.Router();

questionRouter.route('/')
  .get(async (req: Request, res: Response) => {
    let controller = new QuestionController();
    let id: string | undefined = req.query.id as string;
    try {
      let result;
      if (id) {
        result = await controller.getQuestions(id);
      } else {
        result = await controller.getQuestions();
      }
      return res.status(200).send(result);
    } catch (error) {
      LogError(`Error fetching questions: ${error}`);
      return res.status(500).send({ message: 'Error fetching questions' });
    }
  })
  .post(async (req: Request, res: Response) => {
    let controller = new QuestionController();
    let question = req.body;
    try {
      let result = await controller.createQuestion(question);
      return res.status(201).send(result);
    } catch (error) {
      LogError(`Error creating question: ${error}`);
      return res.status(500).send({ message: 'Error creating question' });
    }
  })
  .put(async (req: Request, res: Response) => {
    let controller = new QuestionController();
    let id = req.query.id as string;
    let question = req.body;
    LogInfo(`Received PUT request with ID: ${id} and data: ${JSON.stringify(question)}`);
    try {
      let result = await controller.updateQuestion(id, question);
      if (result) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ message: 'Question not found' });
      }
    } catch (error) {
      LogError(`Error updating question: ${error}`);
      return res.status(500).send({ message: 'Error updating question' });
    }
  })
  .delete(async (req: Request, res: Response) => {
    let controller = new QuestionController();
    let id = req.query.id as string;
    LogInfo(`Received DELETE request with ID: ${id}`);
    try {
      let result = await controller.deleteQuestion(id);
      if (result) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ message: 'Question not found' });
      }
    } catch (error) {
      LogError(`Error deleting question: ${error}`);
      return res.status(500).send({ message: 'Error deleting question' });
    }
  });

export default questionRouter;
