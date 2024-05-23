import express, { Request, Response } from 'express';
import { LogInfo, LogError } from '../utils/logger';
import { CitaController } from '@/controller/citaController';

const citaRouter = express.Router();

// http://localhost:8000/api/citas
citaRouter.route('/')
  .get(async (req: Request, res: Response) => {
    let controller = new CitaController();
    let id: string | undefined = req.query.id as string;
    try {
      let result;
      if (id) {
        result = await controller.getCitas(id);
      } else {
        result = await controller.getCitas();
      }
      return res.status(200).send(result);
    } catch (error) {
      LogError(`Error fetching Citas: ${error}`);
      return res.status(500).send({ message: 'Error fetching Citas' });
    }
  })
  .post(async (req: Request, res: Response) => {
    let controller = new CitaController();
    let cita = req.body;
    try {
      let result = await controller.createCita(cita);
      return res.status(201).send(result);
    } catch (error) {
      LogError(`Error creating Cita: ${error}`);
      return res.status(500).send({ message: 'Error creating Cita' });
    }
  })
  .put(async (req: Request, res: Response) => {
    let controller = new CitaController();
    let id = req.query.id as string;
    let cita = req.body;
    LogInfo(`Received PUT request with ID: ${id} and data: ${JSON.stringify(cita)}`);
    try {
      let result = await controller.updateCita(id, cita);
      if (result) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ message: 'Cita no encontrada' });
      }
    } catch (error) {
      LogError(`Error updating Cita: ${error}`);
      return res.status(500).send({ message: 'Error updating Cita' });
    }
  })
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
