import { Schema, model } from "mongoose";
import { Types } from "mongoose";

const estudianteSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        trim: true,
    },
    apellido: {
        type: String,
        require: true,
        trim: true,
    },
    cedula: {
        type: Number,
        require: true,
        trim: true,
        unique: true,
    },
    fechaNacimiento: {
        type: Date,
        require: true,
        trim: true,
    },
    ciudad: {
        type: String,
        require: true,
        trim: true,
    },
    direccion: {
        type: String,
        require: true,
        trim: true,
    },
    telefono: {
        type: Number,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    materias:[{
        type: Types.ObjectId,
        ref: "Materia",
    }]
},
{
    timestamps: true,
});

export default model("Estudiante", estudianteSchema);