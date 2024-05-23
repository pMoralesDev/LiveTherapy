import mongoose, { Schema, Document, Model } from 'mongoose';
import { IAnswer, answerType } from '../interfaces/IAnswer.interface';

const answerSchema: Schema<IAnswer & Document> = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    tipo: {
      type: String,
      required: true,
      enum: Object.values(answerType)
    }
  },
  {
    timestamps: true,
    discriminatorKey: 'tipo'
  }
);

const AnswerModel = mongoose.models.Answers || mongoose.model<IAnswer & Document>('Answers', answerSchema);

export default AnswerModel;