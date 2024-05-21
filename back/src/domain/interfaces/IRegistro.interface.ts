import mongoose from "mongoose";

export interface IRegistro {
    _id: mongoose.Types.ObjectId;
    name: string,
}