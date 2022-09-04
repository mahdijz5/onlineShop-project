const Admin = require("../models/admins")
const Category = require("../models/categories")
const Brand = require("../models/brands")
const Product = require("../models/products")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const short = require('short-uuid');
const appRoot = require("app-root-path");

const fs = require("fs");

exports.AdminLogin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        try {
            const user = await Admin.findOne({ email })
            if (!user) {
                res.status(404).json({ "message": " کاربری با این ایمیل وجود ندارد." })
            }

            const checkPass = await bcrypt.compare(password, user.password)
            if (!checkPass) {
                res.status(422).json({ "message": "ایمیل یا رمز عبور اشتباه است." })
            } else {
                const token = jwt.sign({
                    user: {
                        email,
                        Access: user.Access,
                        name: user.name,
                        userId: user.id
                    }
                }, process.env.JWT_SECRET, {
                    expiresIn: 300
                })
                res.status(200).json({ token, userId: user.id.toString() })
            }


        } catch (error) {
            next(error)
        }
    } catch (error) {

    }
}

exports.adminAuth = (req, res, next) => {
    const authHeader = req.get("Authorization")
    const token = authHeader.split(" ")[1]

    if (!token) {
        res.status(401).json({ "message": "شما مجوز کافی ندارید" })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.status(402).json({ "message": "شما مجوز کافی ندارید" })
            } else {
                try {
                    const admin = await Admin.findOne({ email: decodedToken.email })
                    if (!admin || _.isUndefined(decodedToken.user.Access)) {
                        res.status(403).json({ "message": "شما مجوز کافی ندارید" })
                    } else {
                        req.userId = decodedToken.id
                        res.status(200).json({ "message": "شما مجاز هستید" });
                    }
                } catch (error) {
                    next(error)
                }
            }
        })
    }

}

//* category_ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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

exports.createCategory = async (req, res, next) => {
    const { title } = req.body;
    try {
        const category = await Category.findOne({ title });
        if (category) {
            res.status(406).json({ "message": "این دسته تکراری است" })
        } else {
            await Category.create({
                title,
            })
            res.status(201).json({ "message": "دسته با موفقیت ساخته شد" })
        }
    } catch (error) {
        next(error)
    }
}


exports.editCategory = async (req, res, next) => {
    try {
        console.log(12213)
        const { title } = req.body;
        const id = req.params.id
        const category = await Category.findOne({ _id: id });
        if (!category) {
            res.status(404).json({ "message": "این دسته وجود ندارد" })
        } else {
            category.title = title;
            await category.save()
            res.status(200).json({ "message": "دسته با موفقیت ویرایش شد" })
        }
    } catch (error) {
        next(error)
    }
}

exports.removeCategory = async (req, res, next) => {
    try {
        const id = req.params.id
        const category = await Category.findOne({ _id: id })
        if (!category) {
            res.status(404).json({ "message": "این دسته وجود ندارد" })
            next()
        }
        await category.remove()
        res.status(200).json({ "message": "دسته با موفقیت حذف شد" })
    } catch (error) {
        next(error)
    }
}

//* brand_ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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

exports.createBrand = async (req, res, next) => {
    const { title } = req.body;
    try {
        const brand = await Brand.findOne({ title });
        if (brand) {
            res.status(406).json({ "message": "این برند تکراری است" })
        } else {
            await Brand.create({
                title,
            })
            res.status(201).json({ "message": "برند با موفقیت ساخته شد" })
        }
    } catch (error) {
        next(error)
    }
}


exports.editBrand = async (req, res, next) => {
    try {
        console.log(12213)
        const { title } = req.body;
        const id = req.params.id
        const brand = await Brand.findOne({ _id: id });
        if (!brand) {
            res.status(404).json({ "message": "این برند وجود ندارد" })
        } else {
            brand.title = title;
            await brand.save()
            res.status(200).json({ "message": "برند با موفقیت ویرایش شد" })
        }
    } catch (error) {
        next(error)
    }
}

exports.removeBrand = async (req, res, next) => {
    try {
        const id = req.params.id
        const brand = await Brand.findOne({ _id: id })
        if (!brand) {
            res.status(404).json({ "message": "این برند وجود ندارد" })
            next()
        }
        await brand.remove()
        res.status(200).json({ "message": "برند با موفقیت حذف شد" })
    } catch (error) {
        next(error)
    }
}

//* product >>>>>>>>>>>>>>>>>>>>>>>>

exports.getAllProducts = async (req, res, next) => {
    try {
        const page = req.query.page || 1
        const search = req.query.search || false
        const category = req.query.categories || false
        const searching = req.query.search || req.query.categories ? true : false;
        const itemPerPage = req.query.limit

        //mongoDb Queries 
        let categorySearchQuery = { "none": "" }
        const textSearchQuery = search ? { $text: { $search: search } } : { "none": "" }

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

        if (searching) {
            const numberOfFilteredItems = await Product.find({ ...textSearchQuery, ...categorySearchQuery }).countDocuments()
            const filteredproducts = await Product.find({ ...textSearchQuery, ...categorySearchQuery }).sort({
                createdAt: "desc"
            }).populate('categories').populate('brand').limit(itemPerPage).skip((page - 1) * itemPerPage)
            sendData(filteredproducts, numberOfFilteredItems)
        } else {
            const numberOfItems = await Product.find().countDocuments()
            const products = await Product.find().sort({
                createdAt: "desc"
            }).populate('categories').populate('brand').limit(itemPerPage).skip((page - 1) * itemPerPage)
            sendData(products, numberOfItems)
        }

    } catch (error) {
        next(error)
    }
}

exports.addProduct = async (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({ "message": "لطفا تصویری را برای محصول اپلود کنید" })
    }
    const { description, brand: brandTitle, categories, price, name ,amount,discount} = await req.body;
    const thumbnail = req.files.thumbnail
    const thumbnailName = `${short.generate()}${short.generate()}_${thumbnail.name}`
    const uploadPath = `${appRoot}/public/uploads/${thumbnailName}`
    try {
        const allCategories = []
        if (!brandTitle || brandTitle == '') {
            return res.status(400).json({ "message": "لطفا برند محصول را وارد کنید" })
        }

        await Product.productValidation({ ...req.body, thumbnail })

        thumbnail.mv(uploadPath, (err) => {
            if (err) {
                return next(err);
            }
        })

        if (categories != '') {
            const everyCategory = _.split(categories, ",")
            everyCategory.map(async (c) => {
                const category = await Category.findOne({ title: c })
                if (!category) {
                    res.status(400).json({ "message": "لطفا مقدار دسته را تغییر ندهید" })
                }
                allCategories.push(category._id)
            })
        }


        const brand = await Brand.findOne({ title: brandTitle })
        await Product.create({
            name,
            description,
            brand,
            amount : amount  && amount != undefined? parseInt(amount) : 0,
            price: parseInt(price),
            discount: discount && discount != undefined ? parseInt(discount) : 0,
            thumbnail: thumbnailName,
            categories: allCategories,
        })

        res.status(201).json({ "message": "محصول با موفقیت ساخته شد." })
    } catch (error) {
        console.log(error.errors)
        if (error.errors && error.errors.length > 0) {
            res.status(400).json({ "message": error.errors[0] })

        }
        next(error)
    }
}

exports.removeSelectedProducts = async (req, res, next) => {
    const productsId = await req.params.id
    const products = productsId.split(',')
console.log(products)
    products.map(async (id) => {
        try {
            const product = await Product.findOne({ _id : id })
            if (!product) {
                res.status(404).json({ "message": "محصول مورد نظر یافت نشد" })
            }

            fs.unlink(`${appRoot}/public/uploads/${product.thumbnail}`, (err) => {
                if (err) next(err)
            })

            await product.remove()
        } catch (error) {
            next(error)
        }
    })
    res.status(200).json({ "message": "محصولات با موفقیت حذف شدند" })
}

exports.editProduct = async (req, res, next) => {
    console.log("______________________________")
    const id = req.params.id
    console.log(id)
    if (!req.files) {
        return res.status(400).json({ "message": "لطفا تصویری را برای محصول اپلود کنید" })
    }
    const { description, brand: brandTitle, categories, price, discount, name,amount } = await req.body;
    const thumbnail = req.files.thumbnail
    const thumbnailName = `${short.generate()}${short.generate()}_${thumbnail.name}`
    const uploadPath = `${appRoot}/public/uploads/${thumbnailName}`
    
    try {
        const allCategories = []

        if (!brandTitle || brandTitle == '') {
            return res.status(400).json({ "message": "لطفا برند محصول را وارد کنید" })
        }

        await Product.productValidation({ ...req.body, thumbnail })

        if (categories != '') {
            const everyCategory = _.split(categories, ",")
            everyCategory.map(async (c) => {
                const category = await Category.findOne({ title: c })
                if (!category) {
                    res.status(400).json({ "message": "لطفا مقدار دسته را تغییر ندهید" })
                }
                allCategories.push(category._id)
            })
        }

        const title = brandTitle;
        const brand = await Brand.findOne({ title: title })
        const product = await Product.findOne({ _id : id })
        const prevThumnvail = product.thumbnail;

        product.name = name;
        product.description = description;
        product.brand = brand;
        product.price = parseInt(price);
        product.discount = discount && discount != undefined ? parseInt(discount) : 0;
        product.amount = amount && amount != undefined ? parseInt(amount) : 0;
        product.thumbnail = thumbnailName;
        product.categories = allCategories;

        product.save()

        fs.unlink(`${appRoot}/public/uploads/${prevThumnvail}`, (err) => {
            if (err) next(err)
        })

        thumbnail.mv(uploadPath, (err) => {
            if (err) {
                return next(err);
            }
        })

        res.status(201).json({ "message": "محصول با موفقیت ساخته شد." })
    } catch (error) {
        console.log(error)
        if (error.errors && error.errors.length > 0) {
            res.status(400).json({ "message": error.errors[0] })

        }
        next(error)
    }
}

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
