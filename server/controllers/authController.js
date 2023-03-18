const User = require("../models/users")
const Product = require("../models/products")
const bcrypt = require('bcryptjs');
const _ = require('lodash')
const RefreshToken = require("../models/refreshToken")


const jwt = require('jsonwebtoken');
const { RESPONSE } = require("../languages/responseMsg");

exports.signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        
        const existedEmail = await User.findOne({ email })
        
        if (existedEmail) {
            res.status(422).json({ "message": "This email" + RESPONSE.ERROR._EXISTION })
        } else {
            await User.create({
                name,
                email,
                password,
            })
            res.status(201).json({ "message": RESPONSE.USER.SIGNED_IN })
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.signIn = async (req, res, next) => {
    const { email, password } = req.body
    let productIsInCart = false
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({ "message": RESPONSE.USER.LOGIN_FAILED})
        }
        
        const checkPass = await bcrypt.compare(password, user.password)
        if (!checkPass) {
            res.status(422).json({ "message": RESPONSE.USER.LOGIN_FAILED})
        } else {
            const accessToken = generateAccessToken({
                user: {
                    email,
                    _id: user._id,
                    name: user.name,
                }
            })
            const refreshToken = jwt.sign({
                user: {
                    email,
                    _id: user._id,
                    name: user.name,
                }
            }, process.env.REFRESH_TOKEN_SECRET)

 await RefreshToken.create({
                token: refreshToken,
            })

            res.status(200).json({ accessToken, refreshToken, userId: user.id.toString() })
        }


    } catch (error) {
        next(error)
    }
}

exports.rememberMe = (req, res) => {

}

exports.auth = (req, res, next) => {
    const authHeader = req.get("Authorization")
    const token = authHeader.split(" ")[1]
    
    if (!token) {
        res.status(401).json({ "message": RESPONSE.ERROR.UN_AUTHORIZED })
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(403).json({ "message": RESPONSE.ERROR.UN_AUTHORIZED })
            } else {
                req.userId = decodedToken.user._id
                res.status(200).json({ "message": RESPONSE.SUCCESS.AUTHORIZED});
            }
        })
    }

}

exports.refreshToken = async (req, res, next) => {
    const authHeader = req.get("Authorization")
    const token = authHeader.split(" ")[1]
    try {
        const tokenIsExist = await RefreshToken.findOne({ token })

        if (!token || !tokenIsExist) {
            res.status(401).json({ "message":RESPONSE.ERROR.UN_AUTHORIZED})
            
        } else {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, {user}) => {
                if (err) {
                    res.status(403).json({ "message": RESPONSE.ERROR.UN_AUTHORIZED })
                } else {
                    const accessToken = generateAccessToken({
                        user: {
                            email : user.email,
                            _id: user._id,
                            name: user.name
                        }
                    })
                    const refreshToken = jwt.sign({
                        user: {
                            email : user.email,
                            _id: user._id,
                            name: user.name
                        }
                    }, process.env.REFRESH_TOKEN_SECRET)
                    await tokenIsExist.remove()
                    await RefreshToken.create({
                        token: refreshToken,
                    })
                    res.status(200).json({ accessToken, refreshToken, })
                }
            })
        }
    } catch (err) {
        next(err)
    }

}



const generateAccessToken = (user) => {
    return accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5m"
    })
}

