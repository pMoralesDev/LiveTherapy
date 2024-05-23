import CitaModel from "../entities/cita.entity";
import { ICita } from "../interfaces/ICita.interface";
import { LogError, LogInfo, LogSuccess } from "../../utils/logger";

export const getCitasORM = async (id?: string): Promise<ICita[] | ICita | null> => {
  try {
    if (id) {
      const cita = await CitaModel.findById(id).exec();
      if (cita) {
        LogSuccess(`[ORM SUCCESS]: Cita encontrada con id: ${id}`);
        return cita;
      } else {
        LogInfo(`[ORM INFO]: No encontrada la cita con id: ${id}`);
        return null;
      }
    } else {
      const citas = await CitaModel.find().exec();
      LogSuccess(`[ORM SUCCESS]: Todas las citas encontradas`);
      return citas;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error buscando citas - ${error}`);
    throw new Error('Error al buscar citas');
  }
};

export const createCitaORM = async (cita: ICita): Promise<ICita> => {
  try {
    const newCita = new CitaModel(cita);
    const savedCita = await newCita.save();
    LogSuccess(`[ORM SUCCESS]: Cita creada con id: ${savedCita._id}`);
    return savedCita;
  } catch (error) {
    LogError(`[ORM ERROR]: Error creando Cita - ${error}`);
    throw new Error('Error al crear Cita');
  }
};

export const updateCitaORM = async (id: string, cita: Partial<ICita>): Promise<ICita | null> => {
  LogInfo(`[ORM INFO]: Attempting to update Cita with ID ${id}`);
  LogInfo(`[ORM INFO]: Update data: ${JSON.stringify(cita)}`);
  try {
    const updatedCita = await CitaModel.findByIdAndUpdate(id, cita, { new: true }).exec();
    if (updatedCita) {
      LogSuccess(`[ORM SUCCESS]: Cita actualizada con id: ${id}`);
      return updatedCita;
    } else {
      LogInfo(`[ORM INFO]: No encontrada la cita con id: ${id}`);
      return null;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error al actualizar Cita - ${error}`);
    throw new Error('Error actializando Cita');
  }
};

export const deleteCitaORM = async (id: string): Promise<ICita | null> => {
  LogInfo(`[ORM INFO]: Attempting to delete Cita with ID ${id}`);
  try {
    const deletedCita = await CitaModel.findByIdAndDelete(id).exec();
    if (deletedCita) {
      LogSuccess(`[ORM SUCCESS]: Cita borrada con id: ${id}`);
      return deletedCita;
    } else {
      LogInfo(`[ORM INFO]: No encontrada la cita con id: ${id}`);
      return null;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error borrando cita - ${error}`);
    throw new Error('Error borrrando cita');
  }
};
