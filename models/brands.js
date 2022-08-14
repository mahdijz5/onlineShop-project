const mongoose = require('mongoose');

const brandSchema = new  mongoose.Schema({
    title :{
        type: String,
        required : true,
    },
    products : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }]
})

module.exports = mongoose.model("Brand",brandSchema)