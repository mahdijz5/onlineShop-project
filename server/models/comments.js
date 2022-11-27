const mongoose = require('mongoose');
const Product = require('./products')

const { schema } = require('./validation/commentValidation')

const commentsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        min : 1,
        require: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

//middleWare
commentsSchema.pre('save', function (next) {
    let comment = this
    let rate = 0
    let avgRate = 0
 
    Product.findOne({ _id: comment.product.toString() }).then(async (product) => {
        let number = await mongoose.model("Comment", commentsSchema).find({ product: comment.product.toString() }).countDocuments()
        number++
        const comments = await mongoose.model("Comment", commentsSchema).find({ product: comment.product.toString() })
        comments.map(c => {
            rate += c.rate
        })
        rate += comment.rate
        avgRate = Math.round(rate / number)
        product.rate = avgRate || 0;
        await product.save()
        return next()
    })

})

commentsSchema.pre('remove', function (next) {
    let comment = this
    let rate = 0
    let avgRate = 0
    Product.findOne({ _id: comment.product.toString() }).then(async (product) => {
        let number = await mongoose.model("Comment", commentsSchema).find({ product: comment.product.toString() }).countDocuments()
        console.log("number")
        console.log(number)
        number--
        const comments = await mongoose.model("Comment", commentsSchema).find({ product: comment.product.toString() })
        comments.map(comment => {
            rate += comment.rate
        })
        rate -= comment.rate
        console.log(number)
        avgRate = Math.round(rate / number)
        console.log(avgRate)
        product.rate = avgRate || 0;
        await product.save()
        return next()
    })
 

})

commentsSchema.statics.commentValidation = function (body) {
    return schema.validate(body, { abortEarly: true })
}




module.exports = mongoose.model("Comment", commentsSchema)