import mongoose from "mongoose";

export interface ITerapia {
    _id?: mongoose.Types.ObjectId;
    terapeuta: mongoose.Types.ObjectId,
    paciente: mongoose.Types.ObjectId,
    citas: mongoose.Types.ObjectId[],
    registros: mongoose.Types.ObjectId[],
    chat: mongoose.Types.ObjectId[],
}