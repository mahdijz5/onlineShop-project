const {Router} = require("express");
const router = new Router();

const userController =  require("../controllers/userController")
const {auth} =  require("../middlewares/authontication")


//@desc handle login
//@route GET /user/get-user
router.get("/get-user",auth,userController.getSingleUser)




module.exports = router;