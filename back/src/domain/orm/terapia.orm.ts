import TerapiaModel from '../entities/terapia.entity';
import { ITerapia } from '../interfaces/ITerapia.interface';
import { LogError, LogInfo, LogSuccess } from '../../utils/logger';

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
