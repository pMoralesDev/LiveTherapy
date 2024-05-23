import mongoose from "mongoose";

export enum answerType {
    LIKERT = 'likert',
    SHORT = 'short'
}

export interface IAnswer {
    _id?: mongoose.Types.ObjectId;
    name: string,
    text:string,
    tipo:answerType,
}
