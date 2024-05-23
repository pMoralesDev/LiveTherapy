import express, { Request, Response } from 'express';
import { LogInfo, LogError } from '../utils/logger';
import { CuestionarioController } from '@/controller/cuestionarioController';

const cuestionarioRouter = express.Router();

cuestionarioRouter.route('/')
  .get(async (req: Request, res: Response) => {
    let controller = new CuestionarioController();
    let id: string | undefined = req.query.id as string;
    try {
      let result;
      if (id) {
        result = await controller.getCuestionarios(id);
      } else {
        result = await controller.getCuestionarios();
      }
      return res.status(200).send(result);
    } catch (error) {
      LogError(`Error fetching cuestionarios: ${error}`);
      return res.status(500).send({ message: 'Error fetching cuestionarios' });
    }
  })
  .post(async (req: Request, res: Response) => {
    let controller = new CuestionarioController();
    let cuestionario = req.body;
    try {
      let result = await controller.createCuestionario(cuestionario);
      return res.status(201).send(result);
    } catch (error) {
      LogError(`Error creating cuestionario: ${error}`);
      return res.status(500).send({ message: 'Error creating cuestionario' });
    }
  })
  .put(async (req: Request, res: Response) => {
    let controller = new CuestionarioController();
    let id = req.query.id as string;
    let cuestionario = req.body;
    LogInfo(`Received PUT request with ID: ${id} and data: ${JSON.stringify(cuestionario)}`);
    try {
      let result = await controller.updateCuestionario(id, cuestionario);
      if (result) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ message: 'Cuestionario not found' });
      }
    } catch (error) {
      LogError(`Error updating cuestionario: ${error}`);
      return res.status(500).send({ message: 'Error updating cuestionario' });
    }
  })
  .delete(async (req: Request, res: Response) => {
    let controller = new CuestionarioController();
    let id = req.query.id as string;
    LogInfo(`Received DELETE request with ID: ${id}`);
    try {
      let result = await controller.deleteCuestionario(id);
      if (result) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ message: 'Cuestionario not found' });
      }
    } catch (error) {
      LogError(`Error deleting cuestionario: ${error}`);
      return res.status(500).send({ message: 'Error deleting cuestionario' });
    }
  });

export default cuestionarioRouter;