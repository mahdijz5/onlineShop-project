const User = require("../models/users")
const Product = require("../models/products")
const Comment = require("../models/comments")
const _ = require("lodash")
const appRoot = require("app-root-path");
const jwt = require('jsonwebtoken');

const { fileUpload } = require("../helpers/fileUpload");
const fs = require("fs");
const { RESPONSE } = require("../languages/responseMsg");

exports.getSingleUser = async (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
            res.status(403).json({ message: RESPONSE.ERROR.UN_AUTHORIZED })
        }

        try {
            const user = await User.findOne({ email: decodedToken.user.email }).populate('cart').populate('list')
            if (!user) {
                res.status(404).json({ message: RESPONSE.ERROR.NOT_FOUND })
            }
            res.status(200).json({ user: user })

        } catch (err) {
            next(err)
        }
    })
}

exports.editCart = async (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1]
    const count = req.body.count
    const productId = req.body.product
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, {user}) => {
        if (err) {
            res.status(403).json({ message: RESPONSE.ERROR.UN_AUTHORIZED })
        }

        try {
            const singleUser = await User.findOne({ id: user._id })
            if (!singleUser) {
                res.status(404).json({ message: RESPONSE.ERROR.NOT_FOUND })
            }
            let  cart = [...singleUser.cart]

            let removed = _.remove(cart, function(product) {
                return product == productId;
            });
            for(let i = 0 ; i < count ; i++) {
                cart.push(productId)
            }
            singleUser.cart = cart;
            await singleUser.save()
            res.status(200).json({"message" : RESPONSE.SUCCESS.UPDATED })

        } catch (err) {
            next(err)
        }
    })
 
}

 


exports.addToList = async (req, res, next) => {
    const singleProduct = req.body.product
    let existion = false
    try {
        const user = await User.findOne({ id: req.params.id }).populate('list')
        const product = await Product.findOne({ _id: singleProduct })
        if (!product) {
            res.status(404).json({ message: RESPONSE.ERROR.NOT_FOUND })

        }
        user.list.map(i => {
            if (i._id == singleProduct) {
                existion = true
            }
        })
        if (existion) {
            let index = _.findIndex(user.list, (p) => { return p._id == singleProduct })
            console.log(index)
            if (index > -1) {
                user.list.splice(index, 1)
                await user.save()
                res.status(200).json({ message:  `Product ${RESPONSE.SUCCESS._ADDED} from you'r favorite list`, action: "remove" })
            } else {
                res.status(404).json({ message: RESPONSE.ERROR.NOT_FOUND})
            }

        } else {
            user.list.push(singleProduct)
            await user.save()
            res.status(200).json({ "message": `Product ${RESPONSE.SUCCESS._ADDED} to you'r favorite list`, action: "add" })
        }
    } catch (error) {
        next(error)
    }
}

exports.mergeCart = async (req, res, next) => {
    const { email, cart } = req.body
    let userCart = []
    let newProducts = []
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ "message": RESPONSE.ERROR.NOT_FOUND})
        }
        user.cart.map(c => {
            userCart.push(c.toString())
        })
        newProducts = _.difference(cart, userCart)

        newProducts.map((p) => {
            Product.findOne({ _id: p }).then(async (product) => {
                user.cart.push(p)
                await user.save()
            }).catch((error) => {

            })

        })
        res.status(200).json({ message: "Products"+RESPONSE.SUCCESS._ADDED })

    } catch (error) {
        next(error)
    }
}

exports.getCart = async (req, res, next) => {
    const ids = req.query.ids || []
    let pendingPromises = [];
    let products = []
    let counts = {}
    try {
        if (ids.length <= 0) {
            return res.status(404).json({ "message": RESPONSE.ERROR.NOT_FOUND, "products": [] })
        }
        ids.map((i) => { counts[i] = (counts[i] || 0) + 1; });
        for (const id of _.union(ids)) {
            const asyncPush = async () => {
                const product = await Product.findOne({ _id: id });
                products.push({
                    ...product._doc,
                    count: counts[id]
                })
            }

            pendingPromises.push(asyncPush())
        }
        await Promise.all(pendingPromises)
        res.status(200).json({ products: products.sort() })
    } catch (error) {
        next(error)
    }
}

exports.getComments = async (req, res, next) => {
    const userId = req.params.id
    try {
        const user = await User.findOne({ id: userId })
        if (!user) {
            res.status(404).json({ "message": RESPONSE.ERROR.NOT_FOUND })
        }
        const comments = await Comment.find({ author: user.id }).populate('author').populate('product')

        res.status(200).json({ "comments": comments })
    } catch (error) {
        next(error)
    }
}

exports.removeComment = async (req, res, next) => {
    const id = req.params.id
    const token = req.get("Authorization").split(' ')[1]
    try {
        const comment = await Comment.findOne({ _id: id })
        if (!comment) {
            res.status(404).json({ "message": RESPONSE.ERROR.NOT_FOUND})
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
            if (comment._author != decodedToken.user._id) {
                res.status(403).json({ message: RESPONSE.ERROR.UN_AUTHORIZED })
            } else {
                await comment.remove()
                res.status(200).json({ message:   "You'r comment"+RESPONSE.SUCCESS._DELETED })
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.editComment = async (req, res, next) => {
    const { rate, text } = req.body
    const commentId = req.params.id
    const token = req.get("Authorization").split(' ')[1]
    try {
        const comment = await Comment.findOne({ _id: commentId })
        if (!comment) {
            res.status(404).json({ "message": RESPONSE.ERROR.NOT_FOUND })
        }

        await Comment.commentValidation({ ...req.body }).catch((error) => {
            if (error.errors && error.errors.length > 0) {
                res.status(400).json({ "message": error.errors[0] })
            }
        })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (comment._author != decodedToken.user._id) {
                res.status(403).json({ message: RESPONSE.ERROR.UN_AUTHORIZED})
            }
        })

        comment.rate = rate
        comment.text = text,
            await comment.save()
        res.status(201).json({ "message": "Comment"+RESPONSE.SUCCESS._UPDATED})

    } catch (error) {
        console.log(error)
        next(error)
    }
}



exports.editUser = async (req, res, next) => {
    const token = req.get("Authorization").split(' ')[1]
    const { name, email, address, phoneNumber } = req.body
    const id = req.params.id
    let filesNameList;
    try {
        const user = await User.findOne({ id: id })
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (user._id != decodedToken.user.userId) {
                res.status(403).json({ "message": RESPONSE.ERROR.UN_AUTHORIZED})
            }
        })
        if (!req.files) {
            await User.userValidation({ ...req.body, password: "123456", confirmPassword: "123456" }).catch((error) => {
                console.log(error);
                if (error.errors && error.errors.length > 0) {
                    res.status(400).json({ "message": error.errors[0] })
                }
            })
        } else {
            fileUpload(req.files, process.env.PROFILE_ADDRESS, async (filesList, filesName, path, err) => {
                if (err) {
                    res.status(500).json({ "message": RESPONSE.ERROR.SERVER_SIDE})
                } else {
                    filesList.map((thumbnail) => {
                        User.userValidation({ ...req.body, thumbnail, password: "123456", confirmPassword: "123456" }).catch((error) => {
                            console.log(error);
                            if (error.errors && error.errors.length > 0) {
                                res.status(400).json({ "message": error.errors[0] })
                            }
                        })
                        filesNameList = filesName
                        fs.unlink(`${appRoot}${process.env.PROFILE_ADDRESS}${user.profileImg}`, (err) => {
                            if (err) next(err)
                        })
                    })
                }
            })

        }
        user.email = email
        user.name = name
        user.phoneNumber = phoneNumber
        user.address = address
        user.profileImg = filesNameList ? filesNameList[0] : user.profileImg
        await user.save()
        console.log('sadas')
        res.status(201).json({ "message":  "Personal info"+RESPONSE.SUCCESS._UPDATED})
    } catch (error) {
        next(error)
    }

}