import UserModel from "../entities/user.entity";
import { IUser } from "../interfaces/IUser.interface";
import { LogError, LogInfo, LogSuccess } from "../../utils/logger";

export const getUsers = async (id?: string): Promise<IUser[] | IUser | null> => {
  try {
 
    if (id) {

      const user = await UserModel.findById(id).exec();
      if (user) {
        LogSuccess(`[ORM SUCCESS]: User found with ID ${id}`);
        return user; 
      } else {
        LogInfo(`[ORM INFO]: No user found with ID ${id}`);
        return null;
      }

    } else {
     
      const users = await UserModel.find().exec();
      LogSuccess(`[ORM SUCCESS]: All users retrieved`);
      return users; 
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Error fetching users - ${error}`);
    throw new Error('Error fetching users');
  }
};

