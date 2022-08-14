const mongoose = require('mongoose');

const {schema}= require('./validation/productValidation')

const productsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    thumbnail : {
        type: String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    discount : {
        type : Number,
        default : 0,
    },
    brand : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
    },
    categories : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }],
    description  : {
        type : String,
    },
    rate : {
        type : Number,
        default : 0,
    },
})

productsSchema.statics.productValidation = function (body) {
    return schema.validate(body,{abortEarly: true})
}


module.exports = mongoose.model("Product",productsSchema)