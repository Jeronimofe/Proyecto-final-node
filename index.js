const express = require("express");
require("dotenv").config();


const {connectToDb} = require("./src/utils/db");

connectToDb();

const characterRouter = require("./src/api/characters/characters.routes");

const PORT = process.env.PORT || 8080

const server = express();



server.use(express.json({limit: "5mb"}));
server.use(express.urlencoded({ extended: false }));

server.use("/characters", characterRouter);



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
