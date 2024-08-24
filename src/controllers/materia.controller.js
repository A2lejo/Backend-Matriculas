import MateriaSchema from "../models/materias.js";
import MatriculaSchema from "../models/matriculas.js";

const registrarMateria = async (req, res) => {

	const materia = await MateriaSchema.create(req.body);

	res
		.status(201)
		.json({
			res: `Registro exitoso de la materia`
		});
};

const detalleMateria = async (req, res) => {
	const { codigo } = req.params;

	const materia = await MateriaSchema.findOne({ codigo }).select('-createdAt -updatedAt -__v');

	if (!materia)
		return res
			.status(404)
			.json({ res: `No existe la meteria con el id ${id}` });

	const estudiantes = await MatriculaSchema.find({ materias: materia._id }).select('estudiante').populate('estudiante', 'nombre').select('-_id -createdAt -updatedAt -__v');

	res
		.status(200)
		.json({
			materia, estudiantes
		});
};

const actualizarMateria = async (req, res) => {
	const { codigo } = req.params;
	const materia = await MateriaSchema.findOne({ codigo });
	if (!materia)
		return res
			.status(404)
			.json({ res: `No existe el Materia con el id ${id}` });

	const actualizarMateria = await MateriaSchema.findByIdAndUpdate(materia._id, req.body);

	res.status(200).json({ res: `Materia ${codigo} actualizado` });
};

const eliminarMateria = async (req, res) => {

	const materia = await MateriaSchema.findOne({ codigo: req.params.codigo });
	await MateriaSchema.findByIdAndDelete(materia._id);

	res.status(200).json({ res: `Materia ${req.params.codigo} eliminado` });
};



export {
	registrarMateria,
	detalleMateria,
	actualizarMateria,
	eliminarMateria,
};
