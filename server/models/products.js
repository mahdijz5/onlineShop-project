const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

const { schema } = require('./validation/productValidation')

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: Array,
        required: true,
    },
    price: {
        type: Long,
        required: true,
    },
    discount: {
        type: Number,
        default: "0",
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }],
    description: {
        type: String,
    },
    rate: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        default: 0,
    },
})

productsSchema.index({ name: "text" })


productsSchema.statics.productValidation = function (body) {
    return schema.validate(body, { abortEarly: true })
}



module.exports = mongoose.model("Product", productsSchema)