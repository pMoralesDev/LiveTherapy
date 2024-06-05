import TerapiaModel from '../entities/terapia.entity';
import { ITerapia } from '../interfaces/ITerapia.interface';
import { LogError, LogInfo, LogSuccess } from '../../utils/logger';
import { IUser } from '../interfaces/IUser.interface';
import UserModel from '../entities/user.entity';

/**
 * Trae todos los datos relacionados con terapias
 * @param {string} id de la terapia, es opcional, si se pasa el id busca la terapia concreta y sino trae todas las terapias 
 * @returns dado que terapias almacena id de otras coleciones, retorna todos los datos de las coleciones a las que hace referencia
 */
export const getTerapiasORM = async (id?: string): Promise<ITerapia[] | ITerapia | null> => {
  try {
    if (id) {
      const terapia = await TerapiaModel.findById(id)
        .populate({
          path: 'idTerapeuta'
        })
        .populate({
          path: 'idPaciente'
        })
        .populate({
          path: 'citas'
        })
        .populate({
          path: 'registros'
        })
        .populate({
          path: 'chat'
        }).exec();
      if (terapia) {
        LogSuccess(`[ORM SUCCESS]: Terapia found with ID ${id}`);
        return terapia;
      } else {
        LogInfo(`[ORM INFO]: No terapia found with ID ${id}`);
        return null;
      }
    } else {
      const terapias = await TerapiaModel.find()
        .populate({
          path: 'idTerapeuta',
          select: '-password'
        })
        .populate({
          path: 'idPaciente',
          select: '-password'
        })
        .populate({
          path: 'citas'
        })
        .populate({
          path: 'registros',
          select: '-preguntas -respuestas'
        })
        .populate({
          path: 'chat'
        })
        .exec();
      LogSuccess(`[ORM SUCCESS]: All terapias retrieved`);
      return terapias;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error fetching terapias - ${error}`);
    throw new Error('Error fetching terapias');
  }
};
/**
 * Trae los datos de los pacientes asignados a un terapeuta
 * @param {string} id del terapeuta del que se quiere obtener los pacientes a su cargo 
 * @returns devuelve los datos de todos los pacientes asignados a un terapeuta
 */
export const getPacientesTerapiaORM = async (id: string): Promise<IUser[] | IUser | null> => {
  try {
    const terapias = await TerapiaModel.find({idTerapeuta: id});
    const pacientesID = terapias.map(terapias => terapias.idPaciente)
    const pacientes : IUser[] | null = await UserModel.find({_id: {$in: pacientesID}}).select('-password');;
    LogSuccess(`[ORM SUCCESS]: Obtenidos los pacientes del terapeuta con id ${id}`);
    return pacientes;
  } catch (error) {
    LogError(`[ORM ERROR]: Error al obtener los pacientes del terapeuta ${error}`);
    throw new Error('Error creating terapia');
  }
};
/**
 * Trae los datos de las terapias que tiene asignada un terapeuta
 * @param {string} id del terapeuta del que se quiere obtener las terapias a su cargo
 * @returns devuelve los datos de todas las terapias de un terapeuta
 */
export const getTerapiasTerapeutaORM = async (id: string): Promise<ITerapia[] | ITerapia | null> => {
  try {
    const terapias = await TerapiaModel.find({idTerapeuta: id})
      .populate({
        path: 'idPaciente',
        select: '-password'
      })
      .populate({
        path: 'citas'
      })
      .populate({
        path: 'registros',
      })
      .populate({
        path: 'chat'
      })
      .exec();
    LogSuccess(`[ORM SUCCESS]: Obtenidas las terapias del terapeuta con id: ${id}`);
    return terapias;
  } catch (error) {
    LogError(`[ORM ERROR]: Error al obtener las terapias de terapeuta ${error}`);
    throw new Error('Error feching terapia');
  }
};

export const createTerapiaORM = async (terapia: ITerapia): Promise<ITerapia> => {
  try {
    const newTerapia = new TerapiaModel(terapia);
    const savedTerapia = await newTerapia.save();
    LogSuccess(`[ORM SUCCESS]: Terapia created with ID ${savedTerapia._id}`);
    return savedTerapia;
  } catch (error) {
    LogError(`[ORM ERROR]: Error creating terapia - ${error}`);
    throw new Error('Error creating terapia');
  }
};

export const updateTerapiaORM = async (id: string, terapia: Partial<ITerapia>): Promise<ITerapia | null> => {
  LogInfo(`[ORM INFO]: Attempting to update terapia with ID ${id}`);
  LogInfo(`[ORM INFO]: Update data: ${JSON.stringify(terapia)}`);
  try {
    const updatedTerapia = await TerapiaModel.findByIdAndUpdate(id, terapia, { new: true }).populate(['citas', 'registros', 'chat']).exec();
    if (updatedTerapia) {
      LogSuccess(`[ORM SUCCESS]: Terapia updated with ID ${id}`);
      return updatedTerapia;
    } else {
      LogInfo(`[ORM INFO]: No terapia found with ID ${id}`);
      return null;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error updating terapia - ${error}`);
    throw new Error('Error updating terapia');
  }
};

export const deleteTerapiaORM = async (id: string): Promise<ITerapia | null> => {
  LogInfo(`[ORM INFO]: Attempting to delete terapia with ID ${id}`);
  try {
    const deletedTerapia = await TerapiaModel.findByIdAndDelete(id).exec();
    if (deletedTerapia) {
      LogSuccess(`[ORM SUCCESS]: Terapia deleted with ID ${id}`);
      return deletedTerapia;
    } else {
      LogInfo(`[ORM INFO]: No terapia found with ID ${id}`);
      return null;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error deleting terapia - ${error}`);
    throw new Error('Error deleting terapia');
  }
};
