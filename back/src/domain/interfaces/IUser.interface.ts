import mongoose from "mongoose";

export enum userRoles {
    ADMIN = 'admin',
    PATIENT = 'paciente',
    THERAPIST = 'terapeuta'
}

export interface IUser {
    _id?: mongoose.Types.ObjectId;
    rol: userRoles,
    name: string,
    email: string,
    password: string
    age: number,
    phone: string,
}