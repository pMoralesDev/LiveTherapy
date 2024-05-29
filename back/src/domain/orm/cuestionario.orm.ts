import CuestionarioModel from '../entities/cuestionario.entity';
import { ICuestionario } from '../interfaces/ICuestionario.interface';
import { LogError, LogInfo, LogSuccess } from '../../utils/logger';

export const getCuestionariosORM = async (id?: string): Promise<ICuestionario[] | ICuestionario | null> => {
  try {
    if (id) {
      // Poblar todos los campos de preguntas y anidar la población para answers
      const cuestionario = await CuestionarioModel.findById(id)
                                  .populate({
                                    path: 'preguntas',
                                  })
                                  .exec();
      if (cuestionario) {
        LogSuccess(`[ORM SUCCESS]: Cuestionario found with ID ${id}`);
        return cuestionario;
      } else {
        LogInfo(`[ORM INFO]: No cuestionario found with ID ${id}`);
        return null;
      }
    } else {
      // Aplica la misma lógica para recuperar todos los cuestionarios
      const cuestionarios = await CuestionarioModel.find()
                              .populate({
                                path: 'preguntas',
                              })
                              .populate({
                                path: 'respuestas',
                              })
                              .exec();
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

export const getCuestionarioPreguntasNameORM = async (): Promise<any[]> => {
  try {
    const result = await CuestionarioModel.aggregate([
        {
            $lookup: {
                from: 'questions',
                localField: 'preguntas',
                foreignField: '_id',
                as: 'questionDetails'
            }
        },
        {
            $project: {
                name: 1,
                modelo:1,
                tipo:1,
                preguntas: '$questionDetails.text',
                respuestas:1
            }
        }
    ]);
    LogSuccess(`[ORM SUCCESS]: Cuestionario con nombres de preguntas`);
    return result;
  } catch (error) {
      LogError(`[ORM ERROR]: Error buscando cuestionarios con nombres de preguntas - ${error}`);
      throw error;
  }
};
