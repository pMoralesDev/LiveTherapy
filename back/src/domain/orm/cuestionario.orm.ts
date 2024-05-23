import CuestionarioModel from '../entities/cuestionario.entity';
import { ICuestionario } from '../interfaces/ICuestionario.interface';
import { LogError, LogInfo, LogSuccess } from '../../utils/logger';

export const getCuestionariosORM = async (id?: string): Promise<ICuestionario[] | ICuestionario | null> => {
  try {
    if (id) {
      const cuestionario = await CuestionarioModel.findById(id).populate('preguntas').exec();
      if (cuestionario) {
        LogSuccess(`[ORM SUCCESS]: Cuestionario found with ID ${id}`);
        return cuestionario;
      } else {
        LogInfo(`[ORM INFO]: No cuestionario found with ID ${id}`);
        return null;
      }
    } else {
      const cuestionarios = await CuestionarioModel.find().populate('preguntas').exec();
      LogSuccess(`[ORM SUCCESS]: All cuestionarios retrieved`);
      return cuestionarios;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error fetching cuestionarios - ${error}`);
    throw new Error('Error fetching cuestionarios');
  }
};

export const createCuestionarioORM = async (cuestionario: ICuestionario): Promise<ICuestionario> => {
  try {
    const newCuestionario = new CuestionarioModel(cuestionario);
    const savedCuestionario = await newCuestionario.save();
    LogSuccess(`[ORM SUCCESS]: Cuestionario created with ID ${savedCuestionario._id}`);
    return savedCuestionario;
  } catch (error) {
    LogError(`[ORM ERROR]: Error creating cuestionario - ${error}`);
    throw new Error('Error creating cuestionario');
  }
};

export const updateCuestionarioORM = async (id: string, cuestionario: Partial<ICuestionario>): Promise<ICuestionario | null> => {
  LogInfo(`[ORM INFO]: Attempting to update cuestionario with ID ${id}`);
  LogInfo(`[ORM INFO]: Update data: ${JSON.stringify(cuestionario)}`);
  try {
    const updatedCuestionario = await CuestionarioModel.findByIdAndUpdate(id, cuestionario, { new: true }).populate('preguntas').exec();
    if (updatedCuestionario) {
      LogSuccess(`[ORM SUCCESS]: Cuestionario updated with ID ${id}`);
      return updatedCuestionario;
    } else {
      LogInfo(`[ORM INFO]: No cuestionario found with ID ${id}`);
      return null;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error updating cuestionario - ${error}`);
    throw new Error('Error updating cuestionario');
  }
};

export const deleteCuestionarioORM = async (id: string): Promise<ICuestionario | null> => {
  LogInfo(`[ORM INFO]: Attempting to delete cuestionario with ID ${id}`);
  try {
    const deletedCuestionario = await CuestionarioModel.findByIdAndDelete(id).exec();
    if (deletedCuestionario) {
      LogSuccess(`[ORM SUCCESS]: Cuestionario deleted with ID ${id}`);
      return deletedCuestionario;
    } else {
      LogInfo(`[ORM INFO]: No cuestionario found with ID ${id}`);
      return null;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error deleting cuestionario - ${error}`);
    throw new Error('Error deleting cuestionario');
  }
};
