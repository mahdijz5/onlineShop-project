const {Router} = require("express");
const router = new Router();

const userController =  require("../controllers/userController")


//@desc handle login
//@route POST /user/sign-in
router.post("/sign-in",userController.signIn)

//@desc handle regestring user
//@route POST /user/sign-up
router.post("/sign-up",userController.signUp)

//@desc Check user is authenticated or no
//@route POST  /user/auth
router.post("/auth",userController.auth)

//@desc to refresh to token to keep user authenticated when user is online
//@route POST /user/refresh-token
router.post("/refresh-token",userController.refreshToken)



module.exports = router;