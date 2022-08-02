const jwt = require('jwt');
const Admin = require('../models/admins');

exports.auth = async(req,res,next) => {
    try {
        const token = req.get("Authorization")
        if(!token) {
            const error = new Error("مجوز کافی ندارید")
            error.statusCode = 401
            throw error
        }else {
            jwt.verify(token ,process.env.JWT_SECRET,(err,decodedToken) => {
                if(err) {
                    next(err)
                }else {
                    req.userId = decodedToken.id
                    next();
                }
            })
        }
    } catch (err) {
        next(err)
    }
}

exports.adminAuth = async(req,res,next) => {
    try {
        const token = req.get("Authorization")
        if(!token) {
            const error = new Error("مجوز کافی ندارید")
            error.statusCode = 401
            throw error
        }else {
            jwt.verify(token ,process.env.JWT_SECRET,async(err,decodedToken) => {
                if(err) {
                    next(err)
                }else {
                    const admin =await Admin.findOne({email : decodedToken.email}).catch(err => console.log(err))
                    if(!admin) {
                        const error = new Error("مجوز کافی ندارید")
                        error.statusCode = 401
                        throw error
                    }else {
                    req.userId = decodedToken.id
                    next();
                    }
                }
            })
        }
    } catch (err) {
        next(err)
    }
}