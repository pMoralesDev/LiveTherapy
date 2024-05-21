import { userEntity } from "../entities/user.entity";
import { IUser } from "../interfaces/IUser.interface";
import { LogError, LogInfo, LogSuccess } from "../../utils/logger";
import mongoose from "mongoose";

export const GetAllUsers = async (): Promise<IUser[]> => {

    try {
      const UserModel = userEntity();  
      return await UserModel.find();

    } catch (error) {
      LogError(`[ORM ERROR]: Getting all users: ${error}`);
      throw new Error('Error fetching users'); 
    }
  };