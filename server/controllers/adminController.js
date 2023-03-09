const Admin = require("../models/admins")
const Category = require("../models/categories")
const Brand = require("../models/brands")
const Comment = require("../models/comments")
const Product = require("../models/products")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const short = require('short-uuid');
const appRoot = require("app-root-path");

const fs = require("fs");
const { fileUpload } = require("../helpers/fileUpload");
const { RESPONSE } = require("../languages/responseMsg")

exports.AdminLogin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        try {
            const user = await Admin.findOne({ email })
            if (!user) {
                res.status(404).json({ "message": RESPONSE.ERROR.NOT_FOUND})
            }

            const checkPass = await bcrypt.compare(password, user.password)
            if (!checkPass) {
                res.status(422).json({ "message": RESPONSE.USER.LOGIN_FAILED })
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
        res.status(403).json({ "message": RESPONSE.ERROR.UN_AUTHORIZED })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.status(403).json({ "message": RESPONSE.ERROR.UN_AUTHORIZED})
            } else {
                try {
                    const admin = await Admin.findOne({ email: decodedToken.email })
                    if (!admin || _.isUndefined(decodedToken.user.Access)) {
                        res.status(403).json({ "message": RESPONSE.ERROR.UN_AUTHORIZED })
                    } else {
                        req.userId = decodedToken.id
                        res.status(200).json({ "message": RESPONSE.SUCCESS.AUTHORIZED });
                    }
                } catch (error) {
                    next(error)
                }
            }
        })
    }

}

//* category_ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



exports.createCategory = async (req, res, next) => {
    const { title } = req.body;
    try {
        const category = await Category.findOne({ title });
        if (category) {
            res.status(409).json({ "message": RESPONSE.ERROR.REPETITIVE})
        } else {
            await Category.create({
                title,
            })
            res.status(201).json({ "message": RESPONSE.SUCCESS.CREATED })
        }
    } catch (error) {
        next(error)
    }
}


exports.editCategory = async (req, res, next) => {
    try {
        const { title } = req.body;
        const id = req.params.id
        const category = await Category.findOne({ _id: id });
        if (!category) {
            res.status(404).json({ "message":RESPONSE.ERROR.NOT_FOUND})
        } else {
            category.title = title;
            await category.save()
            res.status(200).json({ "message": RESPONSE.SUCCESS.UPDATED })
        }
    } catch (error) {
        next(error)
    }
}

exports.removeCategory = (req, res, next) => {
    const cId = req.params.id
    const categoriesId = cId.split(',')
    categoriesId.map(async (id, index) => {
        try {
            const category = await Category.findOne({ _id: id })
            if (!category) {
                res.status(404).json({ "message": RESPONSE.ERROR.NOT_FOUND })
                next()
            }
            await category.remove()
        } catch (error) {
            next(error)
        }
    })
    res.status(200).json({ "message": RESPONSE.SUCCESS.DELETED })
}

//* brand_ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


exports.createBrand = async (req, res, next) => {
    const { title } = req.body;
    try {
        const brand = await Brand.findOne({ title });
        if (brand) {
            res.status(409).json({ "message": RESPONSE.ERROR.REPETITIVE})
        } else {
            await Brand.create({
                title,
            })
            res.status(201).json({ "message": RESPONSE.SUCCESS.CREATED })
        }
    } catch (error) {
        next(error)
    }
}


exports.editBrand = async (req, res, next) => {
    try {
        const { title } = req.body;
        const id = req.params.id
        const brand = await Brand.findOne({ _id: id });
        if (!brand) {
            res.status(404).json({ "message": RESPONSE.ERROR.NOT_FOUND })
        } else {
            brand.title = title;
            await brand.save()
            res.status(200).json({ "message": "Brand "+RESPONSE.SUCCESS._UPDATED })
        }
    } catch (error) {
        next(error)
    }
}

exports.removeBrand = (req, res, next) => {
    const bId = req.params.id
    const brandsId = bId.split(',')
    brandsId.map(async (id, index) => {
        try {
            const brand = await Brand.findOne({ _id: id })
            if (!brand) {
                res.status(404).json({ "message": RESPONSE.ERROR.NOT_FOUND})
                next()
            }
            await brand.remove()
        } catch (error) {
            next(error);
        }
    })
    res.status(200).json({ "message": RESPONSE.SUCCESS.CREATED })
}

//* product >>>>>>>>>>>>>>>>>>>>>>>>


exports.addProduct = async (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({ "message": "Product's thumbnail"+RESPONSE.ERROR._ITS_REQUIRED })
    }
    let filesNameList = []
    const allCategories = []
    const { description, brand: brandTitle, categories, price, name, amount, discount } = await req.body;

    try {

        fileUpload(req.files, process.env.THUMBNAIL_ADDRESS, async (filesList, filesName, path, err) => {
            console.log(err)
            filesList.map((thumbnail) => {

                Product.productValidation({ ...req.body, thumbnail }).catch((error) => {
                    console.log(error);
                    if (error.errors && error.errors.length > 0) {
                        res.status(400).json({ "message": error.errors[0] })
                    }
                })
                filesNameList = filesName
            })
        })

        //* Get brand
        if (!brandTitle || brandTitle == '') {
            return res.status(400).json({ "message": "Brand title"+RESPONSE.ERROR._ITS_REQUIRED})
        }
        const brand = await Brand.findOne({ title: brandTitle })

        //* Get categories
        if (categories != '') {
            const everyCategory = _.split(categories, ",")
            for (const c of everyCategory) {
                const category = await Category.findOne({ title: c })
                if (!category) {
                    res.status(400).json({ "message": RESPONSE.ERROR.SERVER_SIDE })
                } else {
                    allCategories.push(category.id)
                }
            }
        }

        await Product.create({
            name,
            description,
            brand,
            amount: amount && amount != undefined ? parseInt(amount) : 0,
            price: price,
            discount: discount && discount != undefined ? parseInt(discount) : 0,
            thumbnail: filesNameList,
            categories: allCategories,
        })

        res.status(201).json({ "message": RESPONSE.SUCCESS.CREATEDs })
    } catch (error) {
        console.error(error)
        next(error)
    }

}

exports.removeSelectedProducts = async (req, res, next) => {
    const productsId = await req.params.id
    const products = productsId.split(',')
    products.map(async (id) => {
        try {
            const product = await Product.findOne({ _id: id })
            if (!product) {
                res.status(404).json({ "message": RESPONSE.ERROR.NOT_FOUND})
            }
            product.thumbnail.map((thumbnail) => {
                fs.unlink(`${appRoot}${process.env.THUMBNAIL_ADDRESS}${thumbnail}`, (err) => {
                    if (err) next(err)
                })
            })

            await product.remove()
        } catch (error) {
            next(error)
        }
    })
    res.status(200).json({ "message": RESPONSE.SUCCESS.DELETED })
}

exports.editProduct = async (req, res, next) => {
    const id = req.params.id
    console.log(req.files)
    const allCategories = []
    const { description, brand: brandTitle, categories, price, name, amount, discount } = await req.body;

    try {
        const product = await Product.findOne({ _id: id })
        if (!product) {
            res.status(404).json({ "message": RESPONSE.ERROR.NOT_FOUND})
        }

        if (req.files !== null) {
            fileUpload(req.files, process.env.THUMBNAIL_ADDRESS, async (filesList, filesName) => {
                filesList.map((thumbnail) => {

                    Product.productValidation({ ...req.body, thumbnail }).catch((error) => {
                        console.log(error);
                        if (error.errors && error.errors.length > 0) {
                            res.status(400).json({ "message": error.errors[0] })
                        }
                    })
                    product.thumbnail.map((thumbnail) => {
                        fs.unlink(`${appRoot}${process.env.THUMBNAIL_ADDRESS}${thumbnail}`, (err) => {
                            if (err) next(err)
                        })
                    })
                    product.thumbnail = filesName
                })
            })
        }

        //* Get brand
        if (!brandTitle || brandTitle == '') {
            return res.status(400).json({ "message":  "Brand title"+RESPONSE.ERROR._ITS_REQUIRED})
        }
        const brand = await Brand.findOne({ title: brandTitle })

        //* Get categories
        if (categories != '') {
            const everyCategory = _.split(categories, ",")
            for (const c of everyCategory) {
                const category = await Category.findOne({ title: c })
                if (!category) {
                    res.status(400).json({ "message": RESPONSE.ERROR.SERVER_SIDE })
                } else {
                    allCategories.push(category.id)
                }

            }
        }

        product.name = name
        product.description = description
        product.brand = brand
        product.amount = amount && amount != undefined ? parseInt(amount) : 0
        product.price = parseInt(price)
        product.discount = discount && discount != undefined ? parseInt(discount) : 0
        product.categories = allCategories

        await product.save()


        res.status(201).json({ "message": RESPONSE.SUCCESS.UPDATED })
    } catch (error) {
        next(error)
    }

}

exports.deleteAllProducts = async (req, res) => {
    const products = await Comment.find({})
    products.map(async (p) => {
        await p.remove()
    })
}


exports.changeAmount = async (req, res, next) => {
    const { value } = req.body
    const id = req.params.id
    try {
        const product = await Product.findOne({ _id: id })
        product.amount = value == "" ? 0 : value;
        await product.save()
        res.status(200).json({ "message":"Product's amount"+RESPONSE.SUCCESS._UPDATED})
    } catch (error) {
        next(error)
    }
}



