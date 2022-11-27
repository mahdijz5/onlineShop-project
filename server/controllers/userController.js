const User = require("../models/users")
const Product = require("../models/products")
const Comment = require("../models/comments")
const _ = require("lodash")

const jwt = require('jsonwebtoken');

exports.getSingleUser = async (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
        console.log(decodedToken)
        if (err) {
            res.status(403).json({ message: "شما مجوز ندارید" })
        }

        try {
            const user = await User.findOne({ email: decodedToken.user.email }).populate('cart').populate('list')
            if (!user) {
                res.status(404).json({ message: "کاربر پیدا نشد" })
            }
            res.status(200).json({ user: user })

        } catch (err) {
            next(err)
        }
    })


}

exports.addToCart = async (req, res, next) => {
    const singleProduct = req.body.product
    try {
        const user = await User.findOne({ id: req.params.id })
        const product = await Product.findOne({ _id: singleProduct })
        if (!product) {
            res.status(404).json({ message: "محصول پیدا نشد" })

        }
        user.cart.push(singleProduct)
        await user.save()
        res.status(200).json({ "message": "محصول با موفقیت به سبد خرید اضافه شد" })
    } catch (error) {
        next(error)
    }
}

exports.removeFromCart = async (req, res, next) => {
    const singleProduct = req.body.product
    try {
        const user = await User.findOne({ id: req.params.id })
        const product = await Product.findOne({ _id: singleProduct })
        if (!product) {
            res.status(404).json({ message: "محصول پیدا نشد" })
        }
        let index = user.cart.indexOf(singleProduct)
        if (index > -1) {
            user.cart.splice(index, 1);
        }
        await user.save()
        res.status(200).json({ "message": "محصول با موفقیت از سبد خرید حذف شد" })
    } catch (error) {
        next(error)
    }
}

exports.addToList = async (req, res, next) => {
    const singleProduct = req.body.product
    let existion = false
    try {
        const user = await User.findOne({ id: req.params.id })
        const product = await Product.findOne({ _id: singleProduct })
        if (!product) {
            res.status(404).json({ message: "محصول پیدا نشد" })

        }
        user.list.map(i => {
            if (i._id == singleProduct) {
                existion = true
            }
        })
        if (existion) {
            let index = user.list.indexOf(singleProduct)
            if (index > -1) {
                user.list.splice(index, 1)
                await user.save()
                res.status(200).json({ message: "محصول با موفقیت از لیست علاقمندی حذف شد", action: "remove" })
            } else {
                res.status(404).json({ message: "محصول پیدا نشد" })
            }

        } else {
            user.list.push(singleProduct)
            await user.save()
            res.status(200).json({ "message": "محصول با موفقیت به لیست علاقمندی اضافه شد", action: "add" })
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
            return res.status(404).json({ "message": "کاربر پیدا نشد" })
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
        res.status(200).json({ message: "کالا ها با موفقیت به سبد خرید اضافه شدند" })

    } catch (error) {
        next(error)
    }
}

exports.getCart = async (req, res, next) => {
    const ids = req.query.ids
    let pendingPromises = [];
    let products = []
    let counts = {}
    try {
        if(ids[0] == '') {
            return res.status(404).json({ "message": "محصولی وجود ندارد"})
        }
        ids.map((i) => { counts[i] = (counts[i] || 0) + 1; }); 
        for(const id of _.union(ids)){
            const asyncPush = async () => {
                const product = await Product.findOne({_id : id});
                products.push({ 
                    ...product._doc, 
                    count : counts[id] 
                })  
            }
        
            pendingPromises.push(asyncPush())
        }
        await Promise.all(pendingPromises)
        res.status(200).json({ products })
    } catch (error) {
        next(error)
    }
}

exports.getComments = async (req,res,next) => {
    const userId = req.params.id
    try {
        const user = await User.findOne({id : userId})
        if(!user) {
            res.status(404).json({"message": "کاربر پیدا نشد"})
        }
        const comments = await Comment.find({author : user.id}).populate('author').populate('product')

        res.status(200).json({"comments": comments})
    } catch (error) {
        next(error)
    }
}

exports.removeComment = async (req,res,next) => {
    const id = req.params.id
    const token = req.get("Authorization").split(' ')[1]
    try {
        const comment = await Comment.findOne({_id : id})
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,async (err, decodedToken) => {
            if(comment._author != decodedToken.id) {
                res.status(403).json({message : "شما مجوز این کار را ندارید"})
            }else{
                await comment.remove()
                res.status(200).json({message : "نظر شما با موفقیت حذف شد"})

            }
        })
    } catch (error) {
        next(error)
    }
}

exports.editComment = async (req, res,next) => {
    const {rate,text,userId} = req.body
    const commentId = req.params.id
    const token = req.get("Authorization").split(' ')[1]
    try {
        const comment = await Comment.findOne({_id : commentId})
        if(!comment) {
            res.status(404).json({ "message": "کامنت مورد نظر یافت نشد"})
        }

        await Comment.commentValidation({...req.body}).catch((error) => {
            if (error.errors && error.errors.length > 0) {
                res.status(400).json({ "message": error.errors[0] })
            }
        })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if(comment.author != decodedToken.id) {
                res.status(403).json({message : "شما مجوز این کار را ندارید"})
            }
        })
        
        comment.rate = rate
        comment.text = text,
        comment.author = userId
        await comment.save()
        res.status(201).json({"message": "نظر شما با موفقیت ثبت شد"})

    } catch (error) {
        console.log(error)
        next(error)
    }
}