import mongoose, { Schema, Document } from 'mongoose';
import { ICita } from '../interfaces/ICita.interface';

const citaSchema: Schema<ICita & Document> = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    acude: {
      type: Boolean,
      required: true,
    },
    informe: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true
  }
);

const CitaModel = mongoose.models.Citas || mongoose.model<ICita & Document>('Citas', citaSchema);

export default CitaModel;
