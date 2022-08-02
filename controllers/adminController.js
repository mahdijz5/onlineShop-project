const Admin = require("../models/admins")
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const _ = require('lodash')

exports.AdminLogin = async(req,res,next) => {
    const {email,password} = req.body
    try {
        try {
            const user = await Admin.findOne({email})
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
                        Access : user.Access,
                        name: user.name,
                        userId: user.id
                    }
                },process.env.JWT_SECRET,{
                    expiresIn : 300
                })
                res.status(200).json({token ,userId : user.id.toString()})
            }
            
    
        } catch (error) {
            next(error)
        }
    } catch (error) {
        
    }
}

exports.adminAuth =  (req,res,next) => {
    const authHeader = req.get("Authorization")
    const token = authHeader.split(" ")[1]
  
        if(!token) {
            res.status(401).json({"message" : "شما مجوز کافی ندارید"})
        }else {
            jwt.verify(token ,process.env.JWT_SECRET,async(err,decodedToken) => {
                if(err) {
                    res.status(401).json({"message" : "شما مجوز کافی ندارید"}) 
                }else {
                    try {
                        const admin =await Admin.findOne({email : decodedToken.email})
                        console.log(admin)
                        console.log(decodedToken)
                        if(!admin || _.isUndefined(decodedToken.user.Access)) {
                            res.status(401).json({"message" : "شما مجوز کافی ندارید"}) 
                        }else {
                            req.userId = decodedToken.id
                            res.status(200).json({"message" : "شما مجاز هستید"});
                        }
                    } catch (error) {
                        next(error)
                    }
                }
            })
        }

}