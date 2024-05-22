import mongoose, { Document, Schema } from "mongoose";

export enum UserRoles {
    ADMIN = 'admin',
    PATIENT = 'paciente',
    THERAPIST = 'terapeuta'
}

export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    rol: UserRoles;
    name: string;
    email: string;
    password: string;
    age: number;
    phone: string;
}