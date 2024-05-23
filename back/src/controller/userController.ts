/**
 * 
 */

import { Body, Get, Put, Post,Delete, Query, Route, Tags } from 'tsoa';
import { IUserController } from './interfaces';
import { LogError, LogInfo, LogSuccess, LogWarning } from '../utils/logger';
import { createUserORM, deleteUserORM,  getUserByIdORM,  getUsersORM, updateUserORM } from '../domain/orm/user.orm';
import { IUser } from '@/domain/interfaces/IUser.interface';
import mongoose from 'mongoose';


@Route('/api/users')
@Tags('UserController')
export class UserController implements IUserController {

  public async getUserByID(@Query() id?: string | undefined): Promise<IUser | null> {
    try {
      const result = await getUserByIdORM(id);
      if (id && result) {
        LogSuccess(`[/api/users] Encontrado usuario con ID: ${id}`);
        return result as IUser; 
      } else {
        LogWarning(`[/api/users] Facilitados todos los usuarios`);
        return null; 
      }
    } catch (error) {
      LogError(`[/api/users] Error buscando usuarios ${error}`);
      throw new Error('Error buscando usuarios');
    }
  }
  /**
   * Obtener usuarios
   * @param {mongoose.Types.ObjectId} id ID del usuario buscado
   * @returns usuario o lista de usuarios
   */
  @Get('/')
  public async getUsers(): Promise<IUser | IUser[]> {
    try {
      return await getUsersORM();
    } catch (error) {
      LogError(`[/api/users] Error buscando usuarios ${error}`);
      throw new Error('Error buscando usuarios');
    }
  }

  /**
   * Crear nuevo usuario
   * @param {IUser} user datos del nuevo usauario
   * @returns Usuario creado
   */
  @Post('/')
  public async createUser(@Body() user: IUser): Promise<IUser> {
    try {
      const newUser = await createUserORM(user);
      LogSuccess(`[/api/users] Usuario creado con ID: ${newUser._id}`);
      return newUser;
    } catch (error) {
      LogError(`[/api/users] Error al crear usuario ${error}`);
      throw new Error('Error creando usaurio');
    }
  }

  @Put('/')
  public async updateUser(@Query() id: string, @Body() user: Partial<IUser>): Promise<IUser | null> {
    try {
      const updatedUser = await updateUserORM(id, user);
      if (updatedUser) {
        LogSuccess(`[/api/users] Actualizado usuario con ID: ${updatedUser._id}`);
        return updatedUser;
      } else {
        LogInfo(`[/api/users] No se pudo actualizar el usuario con el ID: ${id}`);
        return null;
      }
    } catch (error) {
        LogError(`[/api/users] Error al actualizar: ${error}`);
        throw new Error('');
    }
  }

  @Delete('/')
  public async deleteUser(@Query() id: string): Promise<IUser | null> {
    try {
      const deletedUser = await deleteUserORM(id);
      if (deletedUser) {
        LogSuccess(`[/api/users] User deleted with ID: ${deletedUser._id}`);
        return deletedUser;
      } else {
        LogInfo(`[/api/users] No user found with ID: ${id}`);
        return null;
      }
    } catch (error) {
      LogError(`[/api/users] Error deleting user: ${error}`);
      throw new Error('Error deleting user');
    }
  }
}