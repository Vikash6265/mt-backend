const mongoose = require('mongoose');

const crudSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    pinned : {
        type : Boolean,
        default : false,
    }
},
{
    timestamps : true
}
);

module.exports = mongoose.model("Crud",crudSchema);