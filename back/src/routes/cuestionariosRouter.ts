import express, { Request, Response } from 'express';
import { LogInfo, LogError } from '../utils/logger';
import { CuestionarioController } from '@/controller/cuestionarioController';
import { AnswerController } from '@/controller/answerController';
import { QuestionController } from '@/controller/questionController';

const cuestionarioRouter = express.Router();

// CRUD de cuestionarios
//http://localhost:8000/api/cuestionarios
cuestionarioRouter.route('/').get(async (req: Request, res: Response) => {
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
});
cuestionarioRouter.route('/prueba').get(async (req: Request, res: Response) => {
  let controller = new CuestionarioController();
  try {
    let result = await controller.getCuestionarioPreguntasName();
    if (result) {
      return res.status(200).send(result);
    } else {
      return res.status(404).send({ message: 'Error prueba' });
    }
    
  } catch (error) {
    LogError(`Error fetching cuestionarios: ${error}`);
    return res.status(500).send({ message: 'Error fetching cuestionarios' });
  }
});
cuestionarioRouter.route('/').post(async (req: Request, res: Response) => {
  let controller = new CuestionarioController();
  let cuestionario = req.body;
  try {
    let result = await controller.createCuestionario(cuestionario);
    return res.status(201).send(result);
  } catch (error) {
    LogError(`Error creating cuestionario: ${error}`);
    return res.status(500).send({ message: 'Error creating cuestionario' });
  }
});
cuestionarioRouter.route('/').put(async (req: Request, res: Response) => {
  let controller = new CuestionarioController();
  let id = req.query.id as string;
  let cuestionario = req.body;
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
});
cuestionarioRouter.route('/').delete(async (req: Request, res: Response) => {
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

// CRUD de answers
//http://localhost:8000/api/cuestionarios/answers
cuestionarioRouter.route('/answers').get(async (req: Request, res: Response) => {
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
});
cuestionarioRouter.route('/answers').post(async (req: Request, res: Response) => {
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

// CRUD de questions
//http://localhost:8000/api/cuestionarios/questions
cuestionarioRouter.route('/questions').get(async (req: Request, res: Response) => {
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
});
cuestionarioRouter.route('/questions').post(async (req: Request, res: Response) => {
  let controller = new QuestionController();
  let question = req.body;
  try {
    let result = await controller.createQuestion(question);
    return res.status(201).send(result);
  } catch (error) {
    LogError(`Error creating question: ${error}`);
    return res.status(500).send({ message: 'Error creating question' });
  }
});
cuestionarioRouter.route('/questions').put(async (req: Request, res: Response) => {
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
});
cuestionarioRouter.route('/questions').delete(async (req: Request, res: Response) => {
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


export default cuestionarioRouter;