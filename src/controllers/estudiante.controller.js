import EstudianteSchema from '../models/estudiantes.js';
import MatriculaSchema from '../models/matriculas.js';
import UsuarioSchema from '../models/usuarios.js';

const registrarEstudiante = async (req, res) => {

    const { email } = req.body;

    if (Object.values(req.body).includes('')) return res.status(400).json({ res: 'Rellene todos los campos antes de enviar la solicitud' })

    const verificarEmailBDD = await EstudianteSchema.findOne({ email }) || await UsuarioSchema.findOne({ email })

    if (verificarEmailBDD) return res.status(400).json({ res: 'El email ya se encuentra registrado' })

    const nuevoEstudiante = new EstudianteSchema(req.body)

    nuevoEstudiante.usuario = req.usuarioBDD._id

    await nuevoEstudiante.save()

    res.status(201).json({ res: 'Estudiante registrado correctamente' })
};


const listarEstudiantes = async (req, res) => {
    res.status(200).json(await EstudianteSchema.find().select('-createdAt -updatedAt -__v'))
};

const detalleEstudiante = async (req, res) => {
    
    const { cedula } = req.params
    
    const estudiante = await EstudianteSchema.findOne({cedula}).select('-createdAt -updatedAt -__v')

    if (!estudiante) return res.status(404).json({ res: 'Estudiante no encontrado' })

    const materias = await MatriculaSchema.find({estudiante: estudiante._id}).select('materia').populate('materia').select('-createdAt -updatedAt -__v')
    for (let i = 0; i < materias.length; i++) {
        materias[i] = materias[i].materia
    }

    res.status(200).json({ estudiante, materias }) 

};

const actualizarEstudiante = async (req, res) => {
    const { cedula } = req.params

    const estudiante = await EstudianteSchema.findOne({ cedula })

    if (!estudiante) return res.status(400).json({ res: `ID ${id} no válido` })

    if (Object.values(req.body).includes('')) return res.status(400).json({ res: 'Rellene todos los campos antes de enviar la solicitud' })

    await EstudianteSchema.findByIdAndUpdate(estudiante._id, req.body)

    res.status(200).json({ res: 'Estudiante actualizado correctamente' })
};

const eliminarEstudiante = async (req, res) => {
    const { cedula } = req.params

    const estudiante = await EstudianteSchema.findOne({ cedula })

    if( !estudiante) return res.status(404).json({ res: `Cédula ${cedula} no válido`})

    await EstudianteSchema.findByIdAndDelete(estudiante._id)

    res.status(200).json({ res: 'Estudiante eliminado correctamente' })
};

export {
    listarEstudiantes,
    detalleEstudiante,
    registrarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante,
};