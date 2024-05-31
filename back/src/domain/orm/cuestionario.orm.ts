import CuestionarioModel from '../entities/cuestionario.entity';
import { ICuestionario } from '../interfaces/ICuestionario.interface';
import { LogError, LogInfo, LogSuccess } from '../../utils/logger';
import TerapiaModel from '../entities/terapia.entity';
import { ITerapia } from '../interfaces/ITerapia.interface';

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

export const getModelTrueCuestionariosORM = async (): Promise <any[]> => {
  try {
    const result = await CuestionarioModel.find({modelo: true})
        .populate({
          path: 'preguntas',
          select: 'text tipo -_id'
        }).
        select('-respuestas -modelo');
    LogSuccess(`[ORM SUCCESS]: Modelos de cuestionarios no personalizados`);
    return result;
  } catch (error) {
      LogError(`[ORM ERROR]: Error buscando cuestionarios no personalizados - ${error}`);
      throw error;
  }
};

export const getCuestionariosPacienteORM = async (id: string): Promise<ICuestionario[] | ICuestionario | null> => {
  try {
      const terapia:ITerapia | null = await TerapiaModel.findOne({idPaciente: id});
      if (terapia && terapia.registros && terapia.registros.length > 0) {
        const cuestionarios = await CuestionarioModel.find({
          '_id': { $in: terapia.registros }
        })
        .populate({
          path: 'preguntas',
        })
        .exec();
        LogSuccess(`[ORM SUCCESS]: Cuestionario asginados al paciente con id: ${id}`);
        return cuestionarios;
      } else {
        LogInfo(`[ORM INFO]: No se encontraron cuestionarios asignados al pacietne con id: ${id}`);
        return null;
      }
  } catch (error) {
    LogError(`[ORM ERROR]: Error fetching cuestionarios asigandos a paciente - ${error}`);
    throw new Error('Error fetching cuestionarios-paciente');
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


