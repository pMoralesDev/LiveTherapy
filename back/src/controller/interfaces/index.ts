/**
 * 
 */

import { IAnswerBase, ILikertAnswer, IShortAnswer } from "@/domain/interfaces/IAnswer.interface";
import { ICita } from "@/domain/interfaces/ICita.interface";
import { ICuestionario } from "@/domain/interfaces/ICuestionario.interface";
import { IMessage } from "@/domain/interfaces/IMessage.interface";
import { IQuestion } from "@/domain/interfaces/IQuestion.interface";
import { ITerapia } from "@/domain/interfaces/ITerapia.interface";
import { IUser } from "@/domain/interfaces/IUser.interface";

export interface IUserController {
    getUsers(): Promise<IUser[] | IUser | null>;
    getUserByID(id?:string): Promise<IUser | null>;
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

export interface IMessageController {
    getMessages(id?: string): Promise<IMessage | IMessage[]>;
    createMessage(message: IMessage): Promise<IMessage>;
    updateMessage(id: string, message: Partial<IMessage>): Promise<IMessage | null>;
}

export interface IAnswerController {
    getAnswers(id?: string): Promise<IAnswerBase | IAnswerBase[]>;
    createAnswer(answer: ILikertAnswer | IShortAnswer): Promise<IAnswerBase>;
}

export interface ITerapiaController {
    getTerapias(id?: string): Promise<ITerapia | ITerapia[]>;
    createTerapia(terapia: ITerapia): Promise<ITerapia>;
    updateTerapia(id: string, terapia: Partial<ITerapia>):Promise<ITerapia | null>;
    deleteTerapia(id:String): Promise <ITerapia | null>;
}

