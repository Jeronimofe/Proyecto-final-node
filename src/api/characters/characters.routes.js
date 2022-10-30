const express = require("express");
const router = express.Router();
const {upload, deleteFile} = require("../../utils/middleware/file");
const Character = require("./character.model");

router.get("/", (req, res, next) => {
  Character.find()
    .then((characters) => {
      return res.status(200).json(characters);
    })
    .catch((error) => {
      return next(error);
    });

});

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
  
    Character.findById(id)
      .then((character) => {
        return res.status(200).json(character);
      })
      .catch((error) => {
          return next (error);
      });
  });
router.get("/name/:name", (req, res, next) => {
    const name = req.params.name;
  
    Character.find({name})
      .then((character) => {
        return res.status(200).json(character);
      })
      .catch((error) => {
          return next (error);
      });
  });

router.get("/village/:village", (req, res, next) => {
    const village = req.params.village;
  
    Character.find({village})
      .then((character) => {
        return res.status(200).json(character);
      })
      .catch((error) => {
          return next (error);
      });
  });

  router.post("/create",upload.single("img"), async (req, res, next) => {
    try {
      const character = req.body;
      if (req.file) {
        character.img = req.file.path;
      };
      const newCharacter = new Character(character);
      const createdCharacter = await newCharacter.save();
      return res.status(201).json(createdCharacter);
    } catch (error) {
      return next (error);
    }
  });

  router.delete("/delete/:id", async (req, res, next) => {
    try {
      const {id} = req.params;
      await Character.findByIdAndDelete(id);
      return res.status(201).json("Character deleted");
    } catch (error) {
      return next (error);
    }
  });

  router.put('/edit/:id',upload.single("img"), async (req, res, next) => {
    try {
        const { id } = req.params;
        const character = req.body;
        const characterOld = await Character.findById(id);
    if (req.file) {
      if (characterOld.img) {
        deleteFile(characterOld.img);
      }
      character.img = req.file.path;
    }
        const characterModify = new Character(character);
        characterModify._id = id;
        const characterUpdate = await Character.findByIdAndUpdate(id , characterModify, {returnOriginal:false});
        return res.status(200).json(characterUpdate)
    } catch (error) {
        return next (error);
    }
})


  
module.exports = router;



