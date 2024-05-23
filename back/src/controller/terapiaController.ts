import { Get, Post, Put, Body, Query, Route, Tags, Delete } from 'tsoa';
import { LogError, LogInfo, LogSuccess } from '../utils/logger';
import { getTerapiasORM, createTerapiaORM, updateTerapiaORM, deleteTerapiaORM } from '../domain/orm/terapia.orm';
import { ITerapiaController } from './interfaces';
import { ITerapia } from '@/domain/interfaces/ITerapia.interface';

@Route('/api/terapias')
@Tags('TerapiaController')
export class TerapiaController implements ITerapiaController {

  @Get('/')
  public async getTerapias(@Query() id?: string): Promise<ITerapia | ITerapia[]> {
    try {
      const result = await getTerapiasORM(id);
      if (id && result) {
        LogSuccess(`[/api/terapias] Request for terapia data with ID: ${id}`);
        return result as ITerapia;
      } else {
        LogSuccess(`[/api/terapias] Request for all terapia data`);
        return result as ITerapia[];
      }
    } catch (error) {
      LogError(`[/api/terapias] Error fetching terapias: ${error}`);
      throw new Error('Error fetching terapias');
    }
  }

  @Post('/')
  public async createTerapia(@Body() terapia: ITerapia): Promise<ITerapia> {
    try {
      const newTerapia = await createTerapiaORM(terapia);
      LogSuccess(`[/api/terapias] Terapia created with ID: ${newTerapia._id}`);
      return newTerapia;
    } catch (error) {
      LogError(`[/api/terapias] Error creating terapia: ${error}`);
      throw new Error('Error creating terapia');
    }
  }

  @Put('/')
  public async updateTerapia(@Query() id: string, @Body() terapia: Partial<ITerapia>): Promise<ITerapia | null> {
    LogInfo(`[/api/terapias] Attempting to update terapia with ID: ${id}`);
    try {
      const updatedTerapia = await updateTerapiaORM(id, terapia);
      if (updatedTerapia) {
        LogSuccess(`[/api/terapias] Terapia updated with ID: ${updatedTerapia._id}`);
        return updatedTerapia;
      } else {
        LogInfo(`[/api/terapias] No terapia found with ID: ${id}`);
        return null;
      }
    } catch (error) {
      LogError(`[/api/terapias] Error updating terapia: ${error}`);
      throw new Error('Error updating terapia');
    }
  }

  @Delete('/')
    public async deleteTerapia(@Query() id: string): Promise<ITerapia | null> {
        LogInfo(`[/api/terapias] Attempting to delete terapia with ID: ${id}`);
        try {
            const deletedTerapia = await deleteTerapiaORM(id);
            if (deletedTerapia) {
            LogSuccess(`[/api/terapias] Terapia deleted with ID: ${deletedTerapia._id}`);
            return deletedTerapia;
            } else {
            LogInfo(`[/api/terapias] No terapia found with ID: ${id}`);
            return null;
            }
        } catch (error) {
            LogError(`[/api/terapias] Error deleting terapia: ${error}`);
            throw new Error('Error deleting terapia');
        }
    }
}
