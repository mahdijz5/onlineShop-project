const Category = require("../models/categories")
const Brand = require("../models/brands")
const Product = require("../models/products")
const Comment = require("../models/comments")
const _ = require("lodash")

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
        const product = await Product.findOne({ _id: id }).populate('categories').populate('brand')
        if (!product) { res.status(404).json({ "message": "محصول مورد نظر یافت نشد" }) }
        res.status(200).json({ product })
    } catch (error) {
        next(error)
    }
}


exports.getAllProducts = async (req, res, next) => {
    console.log(req.query)
    try {
        const page = req.query.page || 1
        const search = req.query.search || false
        let category = req.query.categories || false
        let brand = req.query.brand || false
        const price = req.query.price ? req.query.price.split('_') || false : false
        const discount = req.query.discount ? req.query.discount.split('_') || false : false
        const searching = req.query.search || req.query.categories || discount || price || brand ? true : false;
        const itemPerPage = req.query.limit
        const sortBy = req.query.sort || false

        //mongoDb Queries 
        const placeHolderQ = { 'none': "" }
        const textSearchQuery = search ? { $text: { $search: search } } : placeHolderQ
        const priceQuery = price ? { price: { $gte: price[0], $lte: price[1] } } : placeHolderQ
        const discountQuery = discount ? { discount: { $gte: +discount[0], $lte: +discount[1] } } : placeHolderQ
        let categorySearchQuery = placeHolderQ
        let brandQuery = placeHolderQ

        if (brand) {
            const singleBrand = await Brand.findOne({ title: brand })
            brandQuery = { brand: { _id: singleBrand?._id } }
        }
        if (category) {
            if (typeof category === 'string') {
                category = category.split(',')
            }
            let categoryQuery = _.concat(category)
            let categories = []

            for (c of categoryQuery) {
                const category = await Category.findOne({ title: c })
                if (category) {
                    categories.push({ _id: category.id })
                }
            }

            categorySearchQuery = { categories: { $all: categories } }
        }
        //sort
        let sortByQuery = {}
        if (sortBy) {
            switch (sortBy) {
                case "popularity":
                    sortByQuery = { rate: "desc" }
                    break;
                case "latest":
                    sortByQuery = { createdAt: "desc" }
                    break;
                case "costly":
                    sortByQuery = { price: "desc" }
                    break;
                case "cheap":
                    sortByQuery = { price: "asc" }
                    break;
                default:
                    sortByQuery = { createdAt: "desc" }
                    break;
            }
        } else {
            sortByQuery = { createdAt: "desc" }
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
            const numberOfFilteredItems = await Product.find({ ...textSearchQuery, ...categorySearchQuery, ...brandQuery, ...priceQuery, ...discountQuery }).countDocuments()
            const filteredproducts = await Product.find({ ...textSearchQuery, ...categorySearchQuery, ...brandQuery, ...priceQuery, ...discountQuery }).sort({
                ...sortByQuery
            }).populate('categories').populate('brand').limit(itemPerPage).skip((page - 1) * itemPerPage)
            // ...textSearchQuery, ...categorySearchQuery ,...brandQuery,...priceQuery,...discountQuery
            sendData(filteredproducts, numberOfFilteredItems)
        } else {
            const numberOfItems = await Product.find().countDocuments()
            const products = await Product.find().sort({
                ...sortByQuery
            }).populate('categories').populate('brand').limit(itemPerPage).skip((page - 1) * itemPerPage)

            sendData(products, numberOfItems)
        }

    } catch (error) {
        next(error)
    }
}


exports.getRelatedProducts = async (req, res, next) => {
    let category = req.query.categories 
    let brand = req.query.brand 
    const itemPerPage = req.query.limit
    const page = req.query.page || 1
    let categorySearchQuery = {"none" : ""}
    let brandQuery = {"none" : ""}
    try {
        if (brand) {
            console.log(brand)
            const singleBrand = await Brand.findOne({ title: brand })
            brandQuery = { brand: { _id: singleBrand.id } }
        }
        if (category) {
            if (typeof category === 'string') {
                category = category.split(',')
            }
            let categoryQuery = _.concat(category)
            let categories = []

            for (c of categoryQuery) {
                const category = await Category.findOne({ title: c })
                if (category) {
                    categories.push({ _id: category.id })
                }
            }

            categorySearchQuery = { categories: { $in: categories } }
        }
        console.log(categorySearchQuery)
        const relatedProducts = await Product.find({$or : [brandQuery,categorySearchQuery]}).sort({
            createdAt: "desc" 
        }).populate('categories').populate('brand').limit(itemPerPage).skip((page - 1) * itemPerPage)

        res.status(200).json({
            products : relatedProducts,
            currentPage: page,
            itemPerPage,
        })

    } catch (error) {
        next(error)
    }
}

exports.sendProductComment = async (req, res,next) => {
    const {rate,text,userId} = req.body
    console.log(req.body)
    const productId = req.params.id
    try {
        const product = await Product.findOne({ _id: productId })
        if(!product) {
            res.status(404).json({ "message": "محصول مورد نظر یافت نشد"})
        }

        await Comment.commentValidation({...req.body}).catch((error) => {
            if (error.errors && error.errors.length > 0) {
                res.status(400).json({ "message": error.errors[0] })
            }
        })

        await Comment.create({
            rate,
            text,
            product : product.id,
            author : userId,
        })
        res.status(201).json({"message": "نظر شما با موفقیت ثبت شد"})

    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.getCommentsOfProduct = async (req, res,next) => {
    const productId = req.params.id
    try {
        const comments = await Comment.find({ product: productId }).sort({createdAt : "desc"}).populate("author")
        res.status(200).json({
            comments,
        })
        
    }catch (error) {
        next(error)

    }
}