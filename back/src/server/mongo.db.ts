
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { LogError, LogSuccess } from '../utils/logger';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {

    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/livetherapy');
    LogSuccess(`Conexion con la base de datos establecida`);

  } catch (error) {

    LogError(`Error al conectar con la base de datos: ${error}`);
    process.exit(1);

  }
};

export default connectDB;