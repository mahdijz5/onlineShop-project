const mongoose = require('mongoose')

const refreshTokenSchema = new mongoose.Schema({
    token: {
        required: true,
        type: String,
    },
    expireAt: {
        type: String,
    }
})

//middleWare
refreshTokenSchema.pre('save', function (next) {
    let token = this

    if (!token.isModified('token')) return next()

    if(!token.isModified('expireAt')) {
        let d = new Date()
        d.setHours(d.getHours() + 24)
        let expireTime = new Date(d)
        token.expireAt = expireTime
    }

    next()

})


refreshTokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("RefreshToken", refreshTokenSchema)