const {Router} = require("express")

const router = new Router()

const productController =  require("../controllers/productController")
const { auth } = require("../middlewares/authontication")


//@desc get all categories
//@route GET  /product/all-categories
router.get("/all-categories",productController.getAllCategories)

//@desc get all brands
//@route GET  /product/all-brands
router.get("/all-brands",productController.getAllBrands)

//@desc get all products
//@route GET  /product/all-products
router.get("/all-products",productController.getAllProducts)

//@desc get relatedProducts
//@route GET  /product/related-products
router.get("/related-products",productController.getRelatedProducts)

//@desc get single product
//@route GET  /product/product/:id
router.get("/get-product/:id",productController.getProduct)

//@desc Send Comment to product
//@route POST  /product/send-product-comment/:id
router.post("/send-product-comment/:id",auth,productController.sendProductComment)

//@desc get comment of  specific product
//@route Get  /product/get-comments/:id
router.get("/get-comments/:id",productController.getCommentsOfProduct)




module.exports = router