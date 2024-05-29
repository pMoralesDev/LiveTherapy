import { Get, Post, Put, Delete, Body, Query, Route, Tags } from 'tsoa';
import { LogError, LogInfo, LogSuccess } from '../utils/logger';
import { ICuestionarioController } from './interfaces';
import { ICuestionario } from '@/domain/interfaces/ICuestionario.interface';
import { createCuestionarioORM, deleteCuestionarioORM, getCuestionariosORM, updateCuestionarioORM, getCuestionarioPreguntasNameORM } from '@/domain/orm/cuestionario.orm';


@Route('/api/cuestionarios')
@Tags('CuestionarioController')
export class CuestionarioController implements ICuestionarioController {
  @Get('/')
  public async getCuestionarios(@Query() id?: string): Promise<ICuestionario | ICuestionario[]> {
    try {
      const result = await getCuestionariosORM(id);
      if (id && result) {
        LogSuccess(`[/api/cuestionarios] Request for cuestionario data with ID: ${id}`);
        return result as ICuestionario;
      } else {
        LogSuccess(`[/api/cuestionarios] Request for all cuestionario data`);
        return result as ICuestionario[];
      }
    } catch (error) {
      LogError(`[/api/cuestionarios] Error fetching cuestionarios: ${error}`);
      throw new Error('Error fetching cuestionarios');
    }
  }

  @Get('/')
  public async getCuestionarioPreguntasName(): Promise<any[]>{
    try {
      const result = await getCuestionarioPreguntasNameORM();
    if(result){
      return result;
    }else {
      return result;
    }
    } catch (error) {
      LogError(`[/api/cuestionarios] Error fetching cuestionarios: ${error}`);
      throw new Error('Error fetching cuestionarios');
    }
  }

  @Post('/')
  public async createCuestionario(@Body() cuestionario: ICuestionario): Promise<ICuestionario> {
    try {
      const newCuestionario = await createCuestionarioORM(cuestionario);
      LogSuccess(`[/api/cuestionarios] Cuestionario created with ID: ${newCuestionario._id}`);
      return newCuestionario;
    } catch (error) {
      LogError(`[/api/cuestionarios] Error creating cuestionario: ${error}`);
      throw new Error('Error creating cuestionario');
    }
  }

  @Put('/')
  public async updateCuestionario(@Query() id: string, @Body() cuestionario: Partial<ICuestionario>): Promise<ICuestionario | null> {
    LogInfo(`[/api/cuestionarios] Attempting to update cuestionario with ID: ${id}`);
    try {
      const updatedCuestionario = await updateCuestionarioORM(id, cuestionario);
      if (updatedCuestionario) {
        LogSuccess(`[/api/cuestionarios] Cuestionario updated with ID: ${updatedCuestionario._id}`);
        return updatedCuestionario;
      } else {
        LogInfo(`[/api/cuestionarios] No cuestionario found with ID: ${id}`);
        return null;
      }
    } catch (error) {
      LogError(`[/api/cuestionarios] Error updating cuestionario: ${error}`);
      throw new Error('Error updating cuestionario');
    }
  }

  @Delete('/')
  public async deleteCuestionario(@Query() id: string): Promise<ICuestionario | null> {
    LogInfo(`[/api/cuestionarios] Attempting to delete cuestionario with ID: ${id}`);
    try {
      const deletedCuestionario = await deleteCuestionarioORM(id);
      if (deletedCuestionario) {
        LogSuccess(`[/api/cuestionarios] Cuestionario deleted with ID: ${deletedCuestionario._id}`);
        return deletedCuestionario;
      } else {
        LogInfo(`[/api/cuestionarios] No cuestionario found with ID: ${id}`);
        return null;
      }
    } catch (error) {
      LogError(`[/api/cuestionarios] Error deleting cuestionario: ${error}`);
      throw new Error('Error deleting cuestionario');
    }
  }
}
