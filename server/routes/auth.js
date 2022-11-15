const {Router} = require("express");
const router = new Router();

const authController =  require("../controllers/authController")


//@desc handle login
//@route POST /user/sign-in
router.post("/sign-in",authController.signIn)

//@desc handle regestring user
//@route POST /user/sign-up
router.post("/sign-up",authController.signUp)

//@desc Check user is authenticated or no
//@route POST  /user/auth
router.post("/auth",authController.auth)

//@desc to refresh to token to keep user authenticated when user is online
//@route POST /user/refresh-token
router.post("/refresh-token",authController.refreshToken)

//@desc logout
//@route POST /user/logout
router.post("/logout",authController.logout)



module.exports = router;