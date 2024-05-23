import express, { Request, Response } from 'express';

import { LogInfo, LogError } from '../utils/logger';
import { AnswerController } from '@/controller/answerController';

const answerRouter = express.Router();

answerRouter.route('/')
  .get(async (req: Request, res: Response) => {
    let controller = new AnswerController();
    let id: string | undefined = req.query.id as string;
    try {
      let result;
      if (id) {
        result = await controller.getAnswers(id);
      } else {
        result = await controller.getAnswers();
      }
      return res.status(200).send(result);
    } catch (error) {
      LogError(`Error fetching answers: ${error}`);
      return res.status(500).send({ message: 'Error fetching answers' });
    }
  })
  .post(async (req: Request, res: Response) => {
    let controller = new AnswerController();
    let answer = req.body;
    try {
      let result = await controller.createAnswer(answer);
      return res.status(201).send(result);
    } catch (error) {
      LogError(`Error creating answer: ${error}`);
      return res.status(500).send({ message: 'Error creating answer' });
    }
  });

export default answerRouter;
