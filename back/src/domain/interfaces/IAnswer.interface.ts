import mongoose, { Document } from 'mongoose';

export enum AnswerType {
  LIKERT = 'likert',
  SHORT = 'short'
}

export interface IAnswerBase extends Document {
  idPregunta: mongoose.Types.ObjectId;
  type: AnswerType;
}

export interface ILikertAnswer extends IAnswerBase {
  respuesta: number;
}

export interface IShortAnswer extends IAnswerBase {
  respuesta: string;
}

