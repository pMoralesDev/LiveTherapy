import express, { Request, Response } from 'express';

import { LogInfo, LogError } from '../utils/logger';
import { MessageController } from '@/controller/messageController';

const messageRouter = express.Router();

messageRouter.route('/')
  .put(async (req: Request, res: Response) => {
    let controller = new MessageController();
    let id = req.query.id as string;
    let message = req.body;
    LogInfo(`Received PUT request with ID: ${id} and data: ${JSON.stringify(message)}`);
    try {
      let result = await controller.updateMessage(id, message);
      if (result) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ message: 'Message not found' });
      }
    } catch (error) {
      LogError(`Error updating message: ${error}`);
      return res.status(500).send({ message: 'Error updating message' });
    }
  });

export default messageRouter;
