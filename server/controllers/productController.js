const Category = require("../models/categories")
const Brand = require("../models/brands")
const Product = require("../models/products")

exports.getAllBrands = async (req, res, next) => {
    try {
        const brands = await Brand.find({})
        if (!brands) {
            res.status(404).json({ "message": "هیچ برند ای وجود ندارد" })
        }
        res.status(200).json({ brands })
    } catch (error) {
        next(error)
    }
}

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({})
        if (!categories) {
            res.status(404).json({ "message": "هیچ دسته ای وجود ندارد" })
        }
        res.status(200).json({ categories })
    } catch (error) {
        next(error)
    }
}


//Products>>>>>>>>>>>>>>>>>>

exports.getProduct = async (req, res, next) => {
    const id = req.params.id
    try {
        const product = await Product.findOne({_id : id}).populate('categories').populate('brand')
        if (!product) { res.status(404).json({ "message": "محصول مورد نظر یافت نشد" }) }
        res.status(200).json({product})
    } catch (error) {
        next(error)
    }
}


exports.getAllProducts = async (req, res, next) => {
    try {
        const page = req.query.page || 1
        const search = req.query.search || false
        const category = req.query.categories || false
        const brand = req.query.brand || false
        const price = req.query.price ?  req.query.price.split(',') || false : false
        const discount =  req.query.discount ? req.query.discount.split(',') || false : false
        const searching = req.query.search || req.query.categories || discount || price ||brand ? true : false;
        const itemPerPage = req.query.limit

        //mongoDb Queries 
        const placeHolderQ = {'none' : ""}
        const textSearchQuery = search ? { $text: { $search: search } } : placeHolderQ
        const brandQuery = brand ? {brand : brand} : placeHolderQ
        const priceQuery = price ? {price : {$gte : price[0],$lte : price[1]}} : placeHolderQ
        const discountQuery = discount ? {discount : {$gte : +discount[0],$lte : +discount[1]}} : placeHolderQ
        let categorySearchQuery = placeHolderQ
        if (category) {
            const categoryQuery = req.query.categories.split(',')
            const categories = []
            for (c of categoryQuery) {
                const category = await Category.findOne({ title: c })
                categories.push({ _id: category.id })
            }
            console.log(categories)
            categorySearchQuery = { categories: { $all: categories } }
        }

           //send Products
           const sendData = (products, numberOfItems) => {
            if (!products || products.length == 0) {
                res.status(404).json({ "message": "محصولی وجود ندارد", products: [] })
            } else {
                res.status(200).json({
                    products,
                    numberOfItems,
                    currentPage: page,
                    itemPerPage,
                })
            }
        }

        if (searching) {
            const numberOfFilteredItems = await Product.find({ ...textSearchQuery, ...categorySearchQuery,...brandQuery,...priceQuery,...discountQuery  }).countDocuments()
            const filteredproducts = await Product.find({ ...textSearchQuery, ...categorySearchQuery ,...brandQuery,...priceQuery,...discountQuery}).sort({
                createdAt: "desc"
            }).populate('categories').populate('brand').limit(itemPerPage).skip((page - 1) * itemPerPage)
            sendData(filteredproducts, numberOfFilteredItems)
        } else {
            const numberOfItems = await Product.find().countDocuments()
            console.log(numberOfItems)
            const products = await Product.find().sort({
                createdAt: "desc"
            }).populate('categories').populate('brand').limit(itemPerPage).skip((page - 1) * itemPerPage)
            sendData(products, numberOfItems)
        }

    } catch (error) {
        next(error)
    }
}