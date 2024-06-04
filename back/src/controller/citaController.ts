import { Get, Post, Put, Delete, Body, Query, Route, Tags } from 'tsoa';
import { ICitaController } from './interfaces';
import { LogError, LogInfo, LogSuccess } from '../utils/logger';
import { IUser } from '@/domain/interfaces/IUser.interface';
import { createCitaORM, deleteCitaORM, getCitasORM, getCitasPacienteORM, getCitasTerapeutaORM, getInformesTerapeutaORM, updateCitaORM } from '@/domain/orm/cita.orm';
import { ICita } from '@/domain/interfaces/ICita.interface';

@Route('/api/terapias/citas')
@Tags('CitaController')
export class CitaController implements ICitaController {

  @Get('/')
  public async getCitas(@Query() id?: string): Promise<ICita | ICita[]> {
    try {
      const result = await getCitasORM(id);
      if (id && result) {
        LogSuccess(`[/api/citas] Request for Cita data with ID: ${id}`);
        return result as ICita;
      } else {
        LogSuccess(`[/api/citas] Request for all Cita data`);
        return result as ICita[];
      }
    } catch (error) {
      LogError(`[/api/citas] Error fetching Citas: ${error}`);
      throw new Error('Error fetching Citas');
    }
  }

  @Get('/terapeuta')
  public async getCitasTerapeuta(@Query() id: string): Promise<ICita | ICita[] | null> {
    try {
      const result = await getCitasTerapeutaORM(id);
      if (result) {
        LogSuccess(`[/api/citas] Citas del terapetua con ID: ${id}`);
        return result;
      } else {
        LogSuccess(`[/api/citas] No se encontraron citas del terapetua con ID: ${id}`);
        return result;
      }
    } catch (error) {
      LogError(`[/api/citas] Error buscando citas de terapeuta: ${error}`);
      throw new Error('Error fetching Citas-terapeuta');
    }
  }

  @Get('/paciente')
  public async getCitasPaciente(@Query() id: string): Promise<ICita | ICita[] | null> {
    try {
      const result = await getCitasPacienteORM(id);
      if (result) {
        LogSuccess(`[/api/citas] Citas del paciente con ID: ${id}`);
        return result;
      } else {
        LogSuccess(`[/api/citas] No se encontraron citas del paciente con ID: ${id}`);
        return result;
      }
    } catch (error) {
      LogError(`[/api/citas] Error buscando citas de paciente: ${error}`);
      throw new Error('Error fetching Citas-paciente');
    }
  }

  @Get('/informes')
  public async getInformesTerapeuta(@Query() id: string): Promise< any[] | null> {
    try {
      const result = await getInformesTerapeutaORM(id);
      if (result) {
        LogSuccess(`[/api/citas/informes] Informes del terapeuta con ID: ${id}`);
        return result;
      } else {
        LogSuccess(`[/api/citas/informes] No se encontraron informes del terapeuta con ID: ${id}`);
        return result;
      }
    } catch (error) {
      LogError(`[/api/citas] Error buscando informes del terapeuta: ${error}`);
      throw new Error('Error fetching informes-terapeuta');
    }
  }

  @Post('/')
  public async createCita(@Body() cita: ICita): Promise<ICita> {
    try {
      const newCita = await createCitaORM(cita);
      LogSuccess(`[/api/citas] Cita created with ID: ${newCita._id}`);
      return newCita;
    } catch (error) {
      LogError(`[/api/citas] Error creating Cita: ${error}`);
      throw new Error('Error creating Cita');
    }
  }

  @Put('/')
  public async updateCita(@Query() id: string, @Body() cita: Partial<ICita>): Promise<ICita | null> {
    LogInfo(`[/api/citas] Attempting to update Cita with ID: ${id}`);
    try {
      const updatedCita = await updateCitaORM(id, cita);
      if (updatedCita) {
        LogSuccess(`[/api/citas] Cita updated with ID: ${updatedCita._id}`);
        return updatedCita;
      } else {
        LogInfo(`[/api/citas] No Cita found with ID: ${id}`);
        return null;
      }
    } catch (error) {
      LogError(`[/api/citas] Error updating Cita: ${error}`);
      throw new Error('Error updating Cita');
    }
  }

  @Delete('/')
  public async deleteCita(@Query() id: string): Promise<ICita | null> {
    LogInfo(`[/api/citas] Attempting to delete Cita with ID: ${id}`);
    try {
      const deletedCita = await deleteCitaORM(id);
      if (deletedCita) {
        LogSuccess(`[/api/citas] Cita deleted with ID: ${deletedCita._id}`);
        return deletedCita;
      } else {
        LogInfo(`[/api/citas] No Cita found with ID: ${id}`);
        return null;
      }
    } catch (error) {
      LogError(`[/api/citas] Error deleting Cita: ${error}`);
      throw new Error('Error deleting Cita');
    }
  }
}
