const {Router} = require("express")

const router = new Router()

const adminController =  require("../controllers/adminController")

//@desc handle login as admin
//@route POST  /admin/login
router.post("/login",adminController.AdminLogin)

//@desc handle login as admin
//@route POST  /admin/login
router.post("/auth",adminController.adminAuth)

module.exports = router