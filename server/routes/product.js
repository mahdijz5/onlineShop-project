const {Router} = require("express")

const router = new Router()

const productController =  require("../controllers/productController")


//@desc get all categories
//@route GET  /product/all-categories
router.get("/all-categories",productController.getAllCategories)

//@desc get all brands
//@route GET  /product/all-brands
router.get("/all-brands",productController.getAllBrands)

//@desc get all products
//@route GET  /product/all-products
router.get("/all-products",productController.getAllProducts)

//@desc get single product
//@route GET  /product/product/:id
router.get("/get-product/:id",productController.getProduct)


module.exports = router