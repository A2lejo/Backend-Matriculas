import { Schema, model } from 'mongoose'
import { Types } from 'mongoose'

const matriculaSchema = new Schema({
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
    materia: {
        type: Types.ObjectId,
        ref: 'Materia',
        require: true
    },
    estudiante: {
        type: Types.ObjectId,
        ref: 'Estudiante',
        require: true
    },
}, {
    timestamps:true
})


export default model('Matricula', matriculaSchema);