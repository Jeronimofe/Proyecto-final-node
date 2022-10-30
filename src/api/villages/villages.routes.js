const express = require("express");
const router = express.Router();
const {isAuth} = require("../../utils/middleware/auth");

const Village = require("./villages.model");

router.get("/", [isAuth], (req, res, next) => {
  Village.find().populate("characters")
    .then((villages) => {
      return res.status(200).json(villages);
    })
    .catch((error) => {
      return next(error);
    });

});

router.get("/:name", (req, res, next) => {
    const name = req.params.name;
  
    Village.find(name)
      .then((village) => {
        return res.status(200).json(village);
      })
      .catch((error) => {
          return next (error);
      });
  });



  router.post("/create", async (req, res, next) => {
    try {
      const village = req.body;
      const newVillage = new Village(village);
      const createdVillage = await newVillage.save();
      return res.status(201).json(createdVillage);
    } catch (error) {
      return next (error);
    }
  });

  router.delete("/delete/:id", async (req, res, next) => {
    try {
      const {id} = req.params;
      await Village.findByIdAndDelete(id);
      return res.status(201).json("Village deleted");
    } catch (error) {
      return next (error);
    }
  });

  router.put('/edit/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const villageModify = new Village(req.body);
        villageModify._id = id;
        const villageUpdate = await Village.findByIdAndUpdate(id , villageModify, {returnOriginal:false});
        return res.status(200).json(villageUpdate)
    } catch (error) {
        return next (error);
    }
})


router.put("/add-character", async (req, res, next) => {
    try {
      const { villageId, characterId} = req.body;
console.log({villageId, characterId});
      const updatedVillage = await Village.findByIdAndUpdate(
        villageId,
        { $push: { characters: characterId } },
        { new: true }
      );
      console.log(updatedVillage);
      return res.status(200).json(updatedVillage);
    } catch (error) {
      return next(error);
    }
  });

  
module.exports = router;