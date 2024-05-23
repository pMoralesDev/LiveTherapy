import UserModel from "../entities/user.entity";
import { IUser } from "../interfaces/IUser.interface";
import { LogError, LogInfo, LogSuccess } from "../../utils/logger";
import mongoose from "mongoose";

export const getUsersORM = async (): Promise<IUser[]> => {
  try {
      const users = await UserModel.find().exec();
      LogSuccess(`[ORM SUCCESS]: todos los usuarios encontrados`);
      return users; 
  } catch (error) {
    LogError(`[ORM ERROR]: Error al buscar usuarios - ${error}`);
    throw new Error('Error al buscar usuarios');
  }
};

export const getUserByIdORM = async (id?: string): Promise< IUser | null> => {
  const user = await UserModel.findById(id).exec();
      if (user) {
        LogSuccess(`[ORM SUCCESS]: Usuarios con id: ${id} encontrado`);
        return user; 
      } else {
        LogInfo(`[ORM INFO]: Usuario con id: ${id} no encontrado`);
        return null;
      }
}

export const createUserORM = async (user: IUser): Promise<IUser> => {
  try {
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();
    LogSuccess(`[ORM SUCCESS]: Usuario creado con el id: ${savedUser._id}`);
    return savedUser;
  } catch (error) {
    LogError(`[ORM ERROR]: Error al crear usuarios - ${error}`);
    throw new Error('Error creando usuario');
  }
};

export const updateUserORM = async (id: string, user: Partial<IUser>): Promise<IUser | null> => {

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true }).exec();
    if (updatedUser) {
      LogSuccess(`[ORM SUCCESS]: User updated with ID ${id}`);
      return updatedUser;
    } else {
      LogInfo(`[ORM INFO]: No user found with ID ${id}`);
      return null;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error updating user - ${error}`);
    throw new Error('Error updating user');
  }
};

export const deleteUserORM = async (id: string): Promise<IUser | null> => {
  
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id).exec();
    if (deletedUser) {
      LogSuccess(`[ORM SUCCESS]: Usuario borrado con ID ${id}`);
      return deletedUser;
    } else {
      LogInfo(`[ORM INFO]: Usuario no encontrado con el ID: ${id}`);
      return null;
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error borrando usuario - ${error}`);
    throw new Error('Error deleting user');
  }
};