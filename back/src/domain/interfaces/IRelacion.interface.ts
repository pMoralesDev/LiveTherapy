import mongoose from "mongoose";

export interface IRelacion {
    _id: mongoose.Types.ObjectId;
    name: string,
}