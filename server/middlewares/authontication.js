const jwt = require('jsonwebtoken');
const Admin = require('../models/admins');

exports.auth = async (req, res, next) => {
 
    const token = req.get("Authorization") ? req.get("Authorization").split(' ')[1] : false
    try {
        if (!token) {
            res.status(401).json({"message": "مجوز کافی ندارید"})
        } else {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
                if (err) {
                    console.log(err)
                    res.status(403).json({"message" : "مجوز کافی ندارید"})
                } else {
                    req.userId = decodedToken.id
                    next()
                }
            })
        }
    } catch (err) {
        next(err)
    }
}

exports.adminAuth = async (req, res, next) => {
    try {
        const token = req.get("Authorization")
        if (!token) {
            const error = new Error("مجوز کافی ندارید")
            error.statusCode = 401
            throw error
        } else {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
                if (err) {
                    next(err)
                } else {
                    const admin = await Admin.findOne({ email: decodedToken.email }).catch(err => console.log(err))
                    if (!admin) {
                        const error = new Error("مجوز کافی ندارید")
                        error.statusCode = 401
                        throw error
                    } else {
                        req.userId = decodedToken.id
                        res.status(200).json({"message" : "شما مجاز هستید"})
                    }
                }
            })
        }
    } catch (err) {
        next(err)
    }
}