import mongoose, { Schema, Document } from 'mongoose';
import { ICuestionario, cuestionarioTipo } from '../interfaces/ICuestionario.interface';

const cuestionarioSchema: Schema<ICuestionario> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
      enum: Object.values(cuestionarioTipo),
    },
    preguntas: [{
      type: mongoose.Types.ObjectId,
      ref: 'Questions',
    }],
  },
  {
    timestamps: true,
  }
);

const CuestionarioModel = mongoose.models.Cuestionarios || mongoose.model<ICuestionario>('Cuestionarios', cuestionarioSchema);

export default CuestionarioModel;