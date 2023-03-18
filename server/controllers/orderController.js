const Order = require('../models/orders')
const User = require('../models/users')
const Product = require('../models/products')
const jwt = require('jsonwebtoken')
const _ = require("lodash")
const { RESPONSE } = require('../languages/responseMsg')

exports.createOrder = async (req, res, next) => {
    const token = req.get('Authorization')?.split(' ')[1]
    let userID = ''
    let productsList = typeof req.body.products == "string" ? req.body.products.split(',') : req.body.products
    let pendingPromises = []
    let cost = 0;
    let discount = 0;
    try {
        if (productsList.length <= 0) {
            res.status(404).json({ "message": RESPONSE.ERROR.NOT_FOUND})
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, { user }) => {
            if (err) {
                res.status(403).json({ message: RESPONSE.ERROR.UN_AUTHORIZED })
            }
            userID = user._id
        })
        const user = await User.findOne({ _id: userID })
        if (user.address === "" || user.address == undefined || user.phoneNumber === "" || user.phoneNumber == undefined) {
            res.status(400).json({ message: "You'r phone number and address are needed" })
        }

        for (const id of productsList) {
            const asyncPush = async () => {
                const product = await Product.findOne({ _id: id });
                cost += product.price.low
                discount += product.price.low - ((product.price.low * product.discount) / 100)
            }
            
            pendingPromises.push(asyncPush())
        }

        await Promise.all(pendingPromises)
        await Order.create({
            customer: userID,
            products: productsList,
            phoneNumber: user.phoneNumber,
            address: user.address,
            cost,
            discount,
        })

        user.cart = []
        await user.save()
        res.status(201).json({ "message": "You'r order"+RESPONSE.SUCCESS._CREATED })
    } catch (err) {
        next(err)
    }
}


exports.getOrders = async (req, res, next) => {
    const token = req.get('Authorization')?.split(' ')[1]
    let id;
    let productList= []
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, { user }) => {
            if (err) {
                res.status(403).json({ message: RESPONSE.ERROR.UN_AUTHORIZED })
            }
            id = user._id;
        })
        const user = await User.findOne({ _id: id })
        const orders = await Order.find({ customer: user._id }).populate('products').populate('customer').sort({ createdAt: "desc" });
        res.json({ orders: orders })
    } catch (error) {
        next(error)
    }
}