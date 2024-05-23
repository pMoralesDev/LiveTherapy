/**
 * 
 */

import { ICita } from "@/domain/interfaces/ICita.interface";
import { ICuestionario } from "@/domain/interfaces/ICuestionario.interface";
import { IQuestion } from "@/domain/interfaces/IQuestion.interface";
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


export interface IQuestionController {
    getQuestions(id?: string): Promise<IQuestion | IQuestion[]>;
    createQuestion(question: IQuestion): Promise<IQuestion>;
    updateQuestion(id: string, question: Partial<IQuestion>): Promise<IQuestion | null>;
    deleteQuestion(id: string): Promise<IQuestion | null>;
}

export interface ICuestionarioController {
    getCuestionarios(id?: string): Promise<ICuestionario | ICuestionario[]>;
    createCuestionario(cuestionario: ICuestionario): Promise<ICuestionario>;
    updateCuestionario(id: string, cuestionario: Partial<ICuestionario>): Promise<ICuestionario | null>;
    deleteCuestionario(id: string): Promise<ICuestionario | null>;
}