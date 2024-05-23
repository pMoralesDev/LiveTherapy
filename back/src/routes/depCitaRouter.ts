import express, { Request, Response } from 'express';
import { LogInfo, LogError } from '../utils/logger';
import { CitaController } from '@/controller/citaController';

const citaRouter = express.Router();

// http://localhost:8000/api/citas
citaRouter.route('/')
  .delete(async (req: Request, res: Response) => {
    let controller = new CitaController();
    let id = req.query.id as string;
    LogInfo(`Received DELETE request with ID: ${id}`);
    try {
      let result = await controller.deleteCita(id);
      if (result) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ message: 'Cita not found' });
      }
    } catch (error) {
      LogError(`Error deleting Cita: ${error}`);
      return res.status(500).send({ message: 'Error deleting Cita' });
    }
  })

  export default citaRouter;
