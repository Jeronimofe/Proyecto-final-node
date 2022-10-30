const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const villageSchema = new Schema(
    {
        name:{type: String, required: true},
        characters:[{
            type: mongoose.Types.ObjectId,
            ref:"characters"
        }],
        symbol:{type: String, required: true},
    
},
{
    timestamps : true,
}
);
const Village = mongoose.model("villages", villageSchema);
module.exports = Village;