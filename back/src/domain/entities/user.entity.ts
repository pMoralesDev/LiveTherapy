import mongoose, { Schema } from 'mongoose';
import { IUser, UserRoles } from '../interfaces/IUser.interface';

const userSchema: Schema<IUser&Document> = new Schema(
    {
        role: {
            type: String,
            required: true,
            enum: Object.values(UserRoles)
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, 'Por favor ingrese un correo electrónico válido']
        },
        password: {
            type: String,
            required: true,
            minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
        },
        age: {
            type: Number,
            required: true,
            min: [0, 'La edad no puede ser negativa'],
            max: [118, 'La persona más longeva del mundo vivió 117 años y 78 días'],
        },
        phone: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

userSchema.index({ email: 1 });

const UserModel = mongoose.models.Users || mongoose.model<IUser&Document>('Users', userSchema);

export default UserModel;