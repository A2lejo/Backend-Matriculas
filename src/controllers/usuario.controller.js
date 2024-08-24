import mongoose from "mongoose"
import UsuarioSchema from "../models/usuarios.js"
import genrearJWT from "../helpers/crearJWT.js"


const registro = async (req, res) => {
    const { email, password } = req.body

    if (Object.values(req.body).includes('')) return res.status(400).json({ res: 'Rellene todos los campos antes de enviar la solicitud' })

    if (await UsuarioSchema.findOne({ email })) return res.status(400).json({ res: 'El email ya se encuentra registrado' })
    
    const nuevoUsuario = new UsuarioSchema(req.body)
    nuevoUsuario.password = await nuevoUsuario.encryptPassword(password)
    await nuevoUsuario.save()

    res.status(201).json({ res: 'Registro exitoso' })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (Object.values(req.body).includes('')) return res.status(404).json({ res: 'Rellene todos los campos antes de enviar la solicitud' })
    
    const usuarioBDD = await UsuarioSchema.findOne({ email }).select('-status -__v -createdAt -updatedAt')

    if (!usuarioBDD) return res.status(404).json({ res: 'El email no se encuentra registrado' })

    const verificarPassword = await usuarioBDD.matchPassword(password)

    const token = genrearJWT(usuarioBDD._id)

    if (!verificarPassword) return res.status(401).json({ res: 'Contraseña incorrecta' })

    const { nombre, apellido, _id } = usuarioBDD

    res.status(200).json({ res: 'Login exitoso', token, nombre, apellido, _id, email })
}

const perfil = (req, res) => {
    if (!req.usuarioBDD) return res.status(404).json({ res: 'No se encuentra el usuario, inicie sesión nuevamente' })
    
    
    delete req.usuarioBDD.password
    delete req.usuarioBDD.createdAt
    delete req.usuarioBDD.updatedAt
    delete req.usuarioBDD.__v

    res.status(200).json(req.usuarioBDD)
}

const listarUsuarios = async (_, res) => {
    res.status(200).json(await UsuarioSchema.find().select('-password -createdAt -updateAt -v'))
}


const detalleUsuario = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ res: `ID ${id} no válido` })

    const usuarioBDD = await UsuarioSchema.findById(id).select('-password')

    res.status(200).json(usuarioBDD)
}


const actualizarPerfil = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ res: `ID ${id} no válido` })
    
    if (Object.values(req.body).includes('')) return res.status(400).json({ res: 'Rellene todos los campos antes de enviar la solicitud' })

    const usuarioBDD = await UsuarioSchema.findById(id)
    
    if(!usuarioBDD) return res.status(404).json({ res: `No existe el usuario ${id}` })
    
    if (usuarioBDD.email != req.body.email) {
        const usuarioBDDMail = await UsuarioSchema.findOne({ email: req.body.email })
        if (usuarioBDDMail) return res.status(404).json({ res: 'El email ya se encuentra registrado'})  
    }

	usuarioBDD.nombre = req.body.nombre || usuarioBDD?.nombre
    usuarioBDD.apellido = req.body.apellido  || usuarioBDD?.apellido
    usuarioBDD.email = req.body.email || usuarioBDD?.email
    
    await usuarioBDD.save()
    
    res.status(200).json({ res: 'Perfil actualizado correctamente'})
}

const actualizarPassword = async (req, res) => {
    const usuarioBDD = await UsuarioSchema.findById(req.usuarioBDD._id)

    const verificarPassword = await usuarioBDD.matchPassword(req.body.password)

    if (!verificarPassword) return res.status(401).json({ res: 'Contraseña incorrecta' })

    usuarioBDD.password = await usuarioBDD.encryptPassword(req.body.newPassword)

    await usuarioBDD.save()

    res.status(200).json({ res: 'Contraseña actualizada' })
}

export {
    login,
    perfil,
    registro,
    detalleUsuario,
    actualizarPerfil,
    actualizarPassword,
    listarUsuarios
}