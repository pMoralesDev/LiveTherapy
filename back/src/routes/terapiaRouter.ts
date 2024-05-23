import express, { Request, Response } from 'express';
import { LogInfo, LogError } from '../utils/logger';
import { TerapiaController } from '@/controller/terapiaController';
import { CitaController } from '@/controller/citaController';
import { MessageController } from '@/controller/messageController';

const terapiaRouter = express.Router();

// CRUD de terapias
terapiaRouter.route('/').get(async (req: Request, res: Response) => {
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
  });
terapiaRouter.route('/').post(async (req: Request, res: Response) => {
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
terapiaRouter.route('/').put(async (req: Request, res: Response) => {
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
terapiaRouter.route('/').delete(async (req: Request, res: Response) => {
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

// CRUD de citas
// http://localhost:8000/api/terapias/citas
terapiaRouter.route('/citas').get(async (req: Request, res: Response) => {
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
terapiaRouter.route('/citas').post(async (req: Request, res: Response) => {
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
terapiaRouter.route('/citas').put(async (req: Request, res: Response) => {
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
// CRUD de messages
// http://localhost:8000/api/terapias/messages
terapiaRouter.route('/messages').get(async (req: Request, res: Response) => {
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
terapiaRouter.route('/messages').post(async (req: Request, res: Response) => {
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
terapiaRouter.route('/messages')

export default terapiaRouter;
