const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema(
    {
        name:{type: String, required: true} ,
        gender:{type: String},
        village:{type: String, required: true},
        elements:{type: String, enum:[ "water", "earth", "fire", "wind", "lighting"]},
        img:{type: String, required: true},
    
},
{
    timestamps : true,
}
);
const Character = mongoose.model("characters", characterSchema);
module.exports = Character;