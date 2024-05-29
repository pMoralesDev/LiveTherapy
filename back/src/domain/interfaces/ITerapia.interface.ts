import mongoose, { Document } from 'mongoose';

export interface ITerapia extends Document {
    _id?: mongoose.Types.ObjectId;
    idTerapeuta: mongoose.Types.ObjectId;
    idPaciente: mongoose.Types.ObjectId;
    citas?: mongoose.Types.ObjectId[];
    registros?: mongoose.Types.ObjectId[];
    chat?: mongoose.Types.ObjectId[];
}