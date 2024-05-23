/**
 * 
 */

import { ICita } from "@/domain/interfaces/ICita.interface";
import { IUser } from "@/domain/interfaces/IUser.interface";

export interface IUserController {
    getUsers(id?:string): Promise<IUser[] | IUser | null>;
    createUser(user:IUser): Promise<IUser>;
    updateUser(id: string, user: Partial<IUser>): Promise<IUser | null> ;
    deleteUser(id: string): Promise<IUser | null>;
}

export interface ICitaController {
    getCitas(id?:string): Promise<ICita[] | ICita | null>;
    createCita(user:ICita): Promise<ICita>;
    updateCita(id: string, user: Partial<ICita>): Promise<ICita | null> ;
    deleteCita(id: string): Promise<ICita | null>;
}