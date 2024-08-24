import jwt from 'jsonwebtoken';


const genrearJWT = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET,);
}

export default genrearJWT;
