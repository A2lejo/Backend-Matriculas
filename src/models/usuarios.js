import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const usarioSchema = new Schema({
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
    email: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
    },
},
{
    timestamps: true,
});

usarioSchema.methods.encryptPassword = async (password) => {
    return await bcrypt.hash(password, await bcrypt.genSalt(10));
};

usarioSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default model("Usuario", usarioSchema);
