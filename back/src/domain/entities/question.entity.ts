import mongoose, { Schema, Document } from 'mongoose';
import { IQuestion, questionType } from '../interfaces/IQuestion.interface';

const questionSchema: Schema<IQuestion & Document> = new Schema(
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
      enum: Object.values(questionType)
    }
  },
  {
    timestamps: true
  }
);

const QuestionModel = mongoose.models.Questions || mongoose.model<IQuestion & Document>('Questions', questionSchema);

export default QuestionModel;