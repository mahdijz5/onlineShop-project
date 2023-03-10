const {Router} = require("express");
const router = new Router();

const authController =  require("../controllers/authController")


//@desc handle login
//@route POST /auth/sign-in
router.post("/sign-in",authController.signIn)

//@desc handle regestring user
//@route POST /auth/sign-up
router.post("/sign-up",authController.signUp)

//@desc Check user is authenticated or no
//@route POST  /auth/auth
router.post("/auth",authController.auth)

//@desc to refresh to token to keep user authenticated when user is online
//@route POST /auth/refresh-token
router.post("/refresh-token",authController.refreshToken)

module.exports = router;