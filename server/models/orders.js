const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const {Types: {Long}} = mongoose;

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],
    address : {
        type : String,
        required : true,
    },
    phoneNumber : {
        type : String,
        required : true,
    },
    cost : {
        type : Long,
        required : true,
    },
    discount : {
        type : Long,
        default : 0, 
    },
    status :{
        type : Number,
        default : 1,
        max : 3,
        min : 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },    
})    

module.exports = mongoose.model("Order", orderSchema)