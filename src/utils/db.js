const mongoose = require("mongoose");
require("dotenv").config();

const URL = process.env.URL;
if(!URL) {
    throw new Error("No se encontro la URL");
};
const connectToDb = async () => {
    try {
const db = await mongoose.connect(URL);
const {name, host} = db.connection;
console.log(`Estamos conectados a la base de datos:${name} , en el host ${host}`);
        
    } catch (error) {
        console.log("Error al conectarse" , error);
    }
};
module.exports = {connectToDb, URL};