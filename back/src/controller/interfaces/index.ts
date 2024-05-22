/**
 * 
 */

import { IUser } from "@/domain/interfaces/IUser.interface";

export interface IUserController {
    getUsers(id?:string): Promise<IUser[]>;
}