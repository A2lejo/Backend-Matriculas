import MatriculaSchema from '../models/matriculas.js';
import { Types } from 'mongoose';

const registrarMatricula = async (req, res) => {

    const { estudiante, materia } = req.body;

    if (!Types.ObjectId.isValid(estudiante) || !Types.ObjectId.isValid(materia))
        return res.status(404).json({ res: 'No existe el estudiante o la materia' })

    const verificarMatricula = await MatriculaSchema.findOne({ estudiante, materia })

    if (verificarMatricula) return res.status(400).json({ res: 'El estudiante ya se encuentra matriculado en la materia' })

    const nuevaMatricula = new MatriculaSchema(req.body)

    await nuevaMatricula.save()

    res.status(201).json({ res: 'Matricula realizada correctamente' })
};

const listarMatriculas = async (req, res) => {

    const matriculas = await MatriculaSchema.find().populate('estudiante', 'nombre apellido email').populate('materia', 'nombre codigo descripcion creditos')

    res.status(200).json(matriculas)
};

const detalleMatricula = async (req, res) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id))
        return res.status(404).json({ res: `No existe la matricula con el id ${id}` });

    res.status(200).json(await MatriculaSchema.findById(id).populate('estudiante', 'nombre apellido email').populate('materia', 'nombre codigo descripcion creditos').select('-createdAt -updatedAt -__v'));
};

const actualizarMatricula = async (req, res) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id))
        return res.status(404).json({ res: `No existe la matricula con el id ${id}` });

    await MatriculaSchema.findByIdAndUpdate(id, req.body);

    res.status(200).json({ res: `Matricula ${id} actualizada` });
};

const eliminarMatricula = async (req, res) => {
    const matricula = await MatriculaSchema.findByIdAndDelete(req.params.id);

    res.status(200).json({ res: `Matricula ${matricula._id} eliminada` });
};

export {
    registrarMatricula,
    listarMatriculas,
    detalleMatricula,
    actualizarMatricula,
    eliminarMatricula
};