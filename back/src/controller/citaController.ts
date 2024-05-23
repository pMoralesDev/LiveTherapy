import { Get, Post, Put, Delete, Body, Query, Route, Tags } from 'tsoa';
import { ICitaController } from './interfaces';
import { LogError, LogInfo, LogSuccess } from '../utils/logger';
import { IUser } from '@/domain/interfaces/IUser.interface';
import { createCitaORM, deleteCitaORM, getCitasORM, updateCitaORM } from '@/domain/orm/cita.orm';
import { ICita } from '@/domain/interfaces/ICita.interface';

@Route('/api/citas')
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
