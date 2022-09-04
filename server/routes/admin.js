const {Router} = require("express")

const router = new Router()

const adminController =  require("../controllers/adminController")

//@desc handle login as admin
//@route POST  /admin/login
router.post("/login",adminController.AdminLogin)

//@desc handle login as admin
//@route POST  /admin/auth
router.post("/auth",adminController.adminAuth)

//* Category >>>>>>>>>>>

//@desc get all categories
//@route GET  /admin/dashboard/all-categories
router.get("/dashboard/all-categories",adminController.getAllCategories)

//@desc handle creating new category
//@route POST  /admin/dashboard/add-category
router.post("/dashboard/add-category",adminController.createCategory)

//@desc edit category
//@route PUT  /admin/dashboard/add-category
router.put("/dashboard/edit-category/:id",adminController.editCategory)

//@desc handle deleting category
//@route DELETE  /admin/dashboard/delete-category
router.delete("/dashboard/delete-category/:id",adminController.removeCategory)

//* Brand >>>>>>>>>>>

//@desc get all brands
//@route GET  /admin/dashboard/all-brands
router.get("/dashboard/all-brands",adminController.getAllBrands)

//@desc handle creating new brand
//@route POST  /admin/dashboard/add-brand
router.post("/dashboard/add-brand",adminController.createBrand)

//@desc edit brand
//@route PUT  /admin/dashboard/add-brand
router.put("/dashboard/edit-brand/:id",adminController.editBrand)

//@desc handle deleting brand
//@route DELETE  /admin/dashboard/delete-brand
router.delete("/dashboard/delete-brand/:id",adminController.removeBrand)

//* Peoduct >>>>>>>>>>>>>>>

//@desc get all products
//@route GET  /admin/dashboard/all-products
router.get("/dashboard/all-products",adminController.getAllProducts)

//@desc handle creating new product
//@route POST  /admin/dashboard/add-product
router.post("/dashboard/add-product",adminController.addProduct)

//@desc handle deleting products
//@route DELETE  /admin/dashboard/delete-products
router.delete("/dashboard/delete-products/:id",adminController.removeSelectedProducts)

//@desc handle editing product
//@route PUT  /admin/dashboard/edit-product
router.put("/dashboard/edit-product/:id",adminController.editProduct)

//@desc get single product
//@route GET  /admin/dashboard/product/:id
router.get("/dashboard/get-product/:id",adminController.getProduct)

module.exports = router