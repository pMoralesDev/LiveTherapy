/**
 * 
 */

import { IUser } from "@/domain/interfaces/IUser.interface";

export interface IUserController {
    getUsers(id?:string): Promise<IUser[] | IUser | null>;
    createUser(user:IUser): Promise<IUser>;
    updateUser(id: string, user: Partial<IUser>): Promise<IUser | null> ;
    deleteUser(id: string): Promise<IUser | null>;
}