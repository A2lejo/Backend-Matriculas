import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const usuariosSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

export default mongoose.model('Usuarios', usuariosSchema);