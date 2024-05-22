/**
 * 
 */

import { Get, Query, Route, Tags } from 'tsoa';
import { IUserController } from './interfaces';
import { LogError, LogInfo, LogSuccess } from '../utils/logger';
import { getUsers } from '../domain/orm/user.orm';
import { IUser } from '@/domain/interfaces/IUser.interface';


@Route('/api/users')
@Tags('UserController')
export class UserController implements IUserController {
  /**
   * Get users or a specific user by ID
   * @param id User ID
   * @returns User or list of users
   */
  @Get('/')
  public async getUsers(@Query() id?: string): Promise<IUser | IUser[]> {
    try {
      const result = await getUsers(id);
      if (id && result) {
        LogSuccess(`[/api/users] Request for user data with ID: ${id}`);
        return result as IUser;  // Devolver el documento de Mongoose directamente
      } else {
        LogSuccess(`[/api/users] Request for all user data`);
        return result as IUser[];  // Devolver los documentos de Mongoose directamente
      }
    } catch (error) {
      LogError(`[/api/users] Error fetching users: ${error}`);
      throw new Error('Error fetching users');
    }
  }
}