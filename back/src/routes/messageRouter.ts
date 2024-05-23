import express, { Request, Response } from 'express';

import { LogInfo, LogError } from '../utils/logger';
import { MessageController } from '@/controller/messageController';

const messageRouter = express.Router();

messageRouter.route('/')
  .get(async (req: Request, res: Response) => {
    let controller = new MessageController();
    let id: string | undefined = req.query.id as string;
    try {
      let result;
      if (id) {
        result = await controller.getMessages(id);
      } else {
        result = await controller.getMessages();
      }
      return res.status(200).send(result);
    } catch (error) {
      LogError(`Error fetching messages: ${error}`);
      return res.status(500).send({ message: 'Error fetching messages' });
    }
  })
  .post(async (req: Request, res: Response) => {
    let controller = new MessageController();
    let message = req.body;
    try {
      let result = await controller.createMessage(message);
      return res.status(201).send(result);
    } catch (error) {
      LogError(`Error creating message: ${error}`);
      return res.status(500).send({ message: 'Error creating message' });
    }
  })
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
