const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const {connectToDb} = require("./src/utils/db");

connectToDb();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const characterRouter = require("./src/api/characters/characters.routes");
const villageRouter = require("./src/api/villages/villages.routes");
const userRouter = require("./src/api/users/users.routes");

const PORT = process.env.PORT || 8080

const server = express();

server.use(cors());

server.use(express.json({limit: "5mb"}));
server.use(express.urlencoded({ extended: false }));



server.use("/characters", characterRouter);
server.use("/villages", villageRouter);
server.use("/users", userRouter);

server.use("/", (req,res) => {
  return res.status(200).json("Servidor OK")});




    server.use("*", (req, res, next) => {
      const error = new Error("Route not found");
      error.status = 404;
      next(error);
    });


  
    server.use((err, req, res, next) => {
      return res.status(err.status ||  500).json(err.message || "Unexpected error");
    });

    


    





server.listen(PORT, () => {
  console.log("Node server listening on port 3000");
});
