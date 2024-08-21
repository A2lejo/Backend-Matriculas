import { Schema, model} from "mongoose";

const materiaSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        trim: true,
    },
    codigo: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    descripcion: {
        type: String,
        require: true,
        trim: true,
    },
    creditos: {
        type: Number,
        require: true,
        trim: true,
    },
},
{
    timestamps: true,
});

export default model("Materia", materiaSchema);
