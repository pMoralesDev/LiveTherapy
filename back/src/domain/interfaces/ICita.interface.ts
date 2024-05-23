import mongoose from "mongoose";

export interface ICita extends Document {
    _id?: mongoose.Types.ObjectId;
    date: Date,
    acude: boolean,
    informe: string,
}