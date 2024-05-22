import { userEntity } from "../entities/user.entity";
import { IUser } from "../interfaces/IUser.interface";
import { LogError, LogInfo, LogSuccess } from "../../utils/logger";
import mongoose from "mongoose";

export const getUsers = async (id?:string): Promise<IUser[]> => {

    try {
      const UserModel = userEntity();
      if(id){
        const user = await UserModel.findById(id);
        return user ? [user] : [];
      }else{
        return await UserModel.find();
      }

    } catch (error) {
      LogError(`[ORM ERROR]: Getting all users: ${error}`);
      throw new Error('Error fetching users'); 
    }
};