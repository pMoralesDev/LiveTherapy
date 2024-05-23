import mongoose from 'mongoose';

export enum questionType {
  LIKERT = 'likert',
  SHORT = 'short'
}

export interface IQuestion {
  _id?: mongoose.Types.ObjectId;
  name: string;
  text: string;
  tipo: questionType;
}