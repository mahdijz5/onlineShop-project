const User = require("../models/users")
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

exports.signUp = async(req,res,next) => {
    const {name,email,password} = req.body;
    try {
    
        const existedEmail = await User.findOne({email})

        if(existedEmail) {
            res.status(422).json({"message" : "این ایمیل وجود دارد."})
        }else { 
        await User.create({
            name,
            email,
            password,
        })
        res.status(201).json({"message" : "شما با موفقیت ثبت نام شدید"})
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.signIn = async(req,res,next) => {
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user) {
            res.status(404).json({"message" : "کاربری با این ایمیل وجود ندارد."})
        }
        
        const checkPass = await bcrypt.compare(password,user.password)
        if(!checkPass) {
            res.status(422).json({"message" : "ایمیل یا رمز عبور اشتباه است."})
        }else {
            const token = jwt.sign({
                user : {
                    email,
                    userId: user.id,
                    name: user.name
                }
            },process.env.JWT_SECRET,{
                expiresIn : 300
            })
            res.status(200).json({token ,userId : user.id.toString()})
        }
        

    } catch (error) {
        next(error)
    }
}

exports.rememberMe = (req,res) => {
    if(req.body.remember) {
        req.session.cookie.originalMaxAge =  1000 *60 * 60 *24
    }else{
        req.session.cookie.expire = null
    }
    if(isItAdmin) {
        res.redirect('/moderator/dashboard')
    }else {
        res.redirect('/admin/dashboard')
    }
}

exports.auth = (req,res,next) => {
    const authHeader = req.get("Authorization")
    const token = authHeader.split(" ")[1]

    if(!token) {
        res.status(401).json({"message" : "شما مجوز کافی ندارید"})
    }else {
        jwt.verify(token ,process.env.JWT_SECRET,(err,decodedToken) => {
            if(err) {
                res.status(401).json({"message" : "شما مجوز کافی ندارید"}) 
            }else {
                req.userId = decodedToken.id
                res.status(200).json({"message" : "شما مجاز هستید"});
            }
        })
    }

}

exports.refreshToken = (req,res,next) => {
    const authHeader = req.get("Authorization")
    const token = authHeader.split(" ")[1]
    if(!token) {
        res.status(401).json({"message" : "شما مجوز کافی ندارید"})
    }else {
        jwt.verify(token ,process.env.JWT_SECRET,async(err,decodedToken) => {
            if(err) {
                res.status(401).json({"message" : "شما مجوز کافی ندارید"}) 
            }else {
                const {email,name,userId,Access} =decodedToken.user
                const newToken = jwt.sign({
                    user : {
                        email,
                        Access ,
                        name,
                        userId,
                    }
                },process.env.JWT_SECRET,{
                    expiresIn : 300,
                })
                res.status(200).json({"token" : newToken})
            }
        })
    }
}