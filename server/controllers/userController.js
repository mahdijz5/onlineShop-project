const User = require("../models/users")
const RefreshToken = require("../models/refreshToken")
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

exports.getSingleUser = async (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
        console.log(decodedToken)
        if(err) {
            res.status(403).json({message: "شما مجوز ندارید"})
        }

        try {
            const user = await User.findOne({ email: decodedToken.user.email })
            if(!user) {
                res.status(404).json({message : "کاربر پیدا نشد"})
            }
            res.status(200).json({user : user})

        } catch (err) {
            next(err)
        }
    })


}