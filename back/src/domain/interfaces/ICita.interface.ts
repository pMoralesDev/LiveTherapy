import mongoose from "mongoose";

export interface ICita {
    _id?: mongoose.Types.ObjectId;
    date: Date,
    acude: boolean,
    informe: string,
}