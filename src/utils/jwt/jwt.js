const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateSign = (id, email) => {

    return jwt.sign({ id, email }, process.env.JWT_SECRET, {expiresIn: '30d'});

}

const verifyJwt = (token) => {

    return jwt.verify(token, process.env.JWT_SECRET);

}

module.exports = { generateSign, verifyJwt }


// Crear dos funciones de jwt -> src/utils/jwt/jwt.js  -> generateSign - generar nuestro token, generateSign va a recibir dos parámetros, van a ser, el id del usuario, y un campo único, en este caso el email.
// Con el id, el email y la clave secreta, podemos generar el token que es lo que retorna mi función generatesign
// verifyJwt - verifica que nuestro token está hecho con la misma clave secreta que usamos nosotros para hacer los tokens (plantilla).