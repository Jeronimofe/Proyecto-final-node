const {mongoose} = require("mongoose");
require("dotenv").config();
const URL = process.env.URL;


const Character = require("../../api/characters/character.model");
const characters = [
    {
        name: "Naruto",
        gender:"male",
        village:"leaf",
        elements:"wind",
        img:"https://w7.pngwing.com/pngs/962/677/png-transparent-uzumaki-naruto-naruto-ultimate-ninja-storm-naruto-uzumaki-sasuke-uchiha-kakashi-hatake-naruto-shippuden-ultimate-ninja-storm-4-naruto-cartoon-fictional-character-naruto-thumbnail.png",
    },
    {
        name: "Itachi",
        gender:"male",
        village:"leaf",
        elements:"fire",
        img:"https://w7.pngwing.com/pngs/691/788/png-transparent-uchiha-itachi-illustration-itachi-uchiha-sasuke-uchiha-madara-uchiha-obito-uchiha-killer-bee-naruto-pain-black-hair-hand-fictional-character-thumbnail.png",
    },
    
{
    name: "Temari",
    gender:"female",
    village:"sand",
    elements:"wind",
    img:"https://i.pinimg.com/originals/90/ed/b2/90edb2d5072ef5fa216e6f1079941bc2.jpg",
},
    {
        name: "Zabuza",
        gender:"male",
        village:"mist",
        elements:"water",
        img:"https://www.pngitem.com/pimgs/m/129-1297274_image-zabuza-momochi-hd-png-download.png",
    },
];

mongoose.connect(URL)
.then(async() => {
    const allCharacters = await Character.find().lean();
    if(allCharacters) {
        await Character.collection.drop();
        console.log("Se elimino al personaje con exito");
    }
}
).catch((error) => console.log("No se pudo borrar los datos" + error))
.then(async () => {

  await Character.insertMany(characters);
  console.log("Nuevos personajes añadidos");

})
.catch((error) => console.log("No se pudo borrar los datos" + error))
.finally(() => mongoose.disconnect());