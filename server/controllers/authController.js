const User = require("../models/users")
const Product = require("../models/products")
const RefreshToken = require("../models/refreshToken")
const bcrypt = require('bcryptjs');
const _ = require('lodash')

const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {

        const existedEmail = await User.findOne({ email })

        if (existedEmail) {
            res.status(422).json({ "message": "این ایمیل وجود دارد." })
        } else {
            await User.create({
                name,
                email,
                password,
            })
            res.status(201).json({ "message": "شما با موفقیت ثبت نام شدید" })
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
            res.status(404).json({ "message": "کاربری با این ایمیل وجود ندارد." })
        }

        const checkPass = await bcrypt.compare(password, user.password)
        if (!checkPass) {
            res.status(422).json({ "message": "ایمیل یا رمز عبور اشتباه است." })
        } else {
            const accessToken = generateAccessToken({
                user: {
                    email,
                    userId: user.id,
                    name: user.name
                }
            })
            const refreshToken = jwt.sign({
                user: {
                    email,
                    userId: user.id,
                    name: user.name
                }
            }, process.env.REFRESH_TOKEN_SECRET)

            RefreshToken.create({
                token: refreshToken,
            })


            console.log(accessToken, refreshToken)
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
        res.status(401).json({ "message": "شما مجوز کافی ندارید" })
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(403).json({ "message": "شما مجوز کافی ندارید" })
            } else {
                req.userId = decodedToken.id
                res.status(200).json({ "message": "شما مجاز هستید" });
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
            res.status(401).json({ "message": "شما مجوز کافی ندارید" })
            
        } else {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, {user}) => {
                if (err) {
                    res.status(403).json({ "message": "شما مجوز کافی ندارید" })
                } else {
                    const accessToken = generateAccessToken({
                        user: {
                            email : user.email,
                            userId: user.id,
                            name: user.name
                        }
                    })
                    const refreshToken = jwt.sign({
                        user: {
                            email : user.email,
                            userId: user.id,
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

exports.logout = async (req, res, next) => {
    const token = req.get("Authorization").split(" ")[1]
    try {
        const refreshToken = await RefreshToken.findOne({ token })
        if (!refreshToken) {
            res.status(404).json({ "message": "توکن پیدا نشد" })
        }
        await refreshToken.remove()
        res.status(200).json({ "message": "you successfully logged out" })
    } catch (error) {
        next(error)
    }
}

const generateAccessToken = (user) => {
    return accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5m"
    })
}

