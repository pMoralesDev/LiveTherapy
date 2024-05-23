import express, { Request, Response } from 'express';
import { LogInfo, LogError } from '../utils/logger';
import { TerapiaController } from '@/controller/terapiaController';

const terapiaRouter = express.Router();

terapiaRouter.route('/')
  .get(async (req: Request, res: Response) => {
    let controller = new TerapiaController();
    let id: string | undefined = req.query.id as string;
    try {
      let result;
      if (id) {
        result = await controller.getTerapias(id);
      } else {
        result = await controller.getTerapias();
      }
      return res.status(200).send(result);
    } catch (error) {
      LogError(`Error fetching terapias: ${error}`);
      return res.status(500).send({ message: 'Error fetching terapias' });
    }
  })
  .post(async (req: Request, res: Response) => {
    let controller = new TerapiaController();
    let terapia = req.body;
    try {
      let result = await controller.createTerapia(terapia);
      return res.status(201).send(result);
    } catch (error) {
      LogError(`Error creating terapia: ${error}`);
      return res.status(500).send({ message: 'Error creating terapia' });
    }
  })
  .put(async (req: Request, res: Response) => {
    let controller = new TerapiaController();
    let id = req.query.id as string;
    let terapia = req.body;
    LogInfo(`Received PUT request with ID: ${id} and data: ${JSON.stringify(terapia)}`);
    try {
      let result = await controller.updateTerapia(id, terapia);
      if (result) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ message: 'Terapia not found' });
      }
    } catch (error) {
      LogError(`Error updating terapia: ${error}`);
      return res.status(500).send({ message: 'Error updating terapia' });
    }
  })
  .delete(async (req: Request, res: Response) => {
    let controller = new TerapiaController();
    let id = req.query.id as string;
    LogInfo(`Received DELETE request with ID: ${id}`);
    try {
      let result = await controller.deleteTerapia(id);
      if (result) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ message: 'Terapia not found' });
      }
    } catch (error) {
      LogError(`Error deleting terapia: ${error}`);
      return res.status(500).send({ message: 'Error deleting terapia' });
    }
  });

export default terapiaRouter;
