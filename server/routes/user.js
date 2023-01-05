const {Router} = require("express");
const router = new Router();

const userController =  require("../controllers/userController")
const {auth} =  require("../middlewares/authontication")
const {sendEmail} = require("../middlewares/nodemailer")

//@desc handle login
//@route GET /user/get-user
router.get("/get-user",auth,userController.getSingleUser)

//@desc add product to cart 
//@route POST /user/add-product-cart
router.post("/edit-product-cart",auth,userController.editCart)

//@desc remove product from cart 
//@route POST /user/remove-product-cart
// router.post("/remove-product-cart",auth,userController.removeFromCart)

//@desc add product to favorite list 
//@route POST /user/add-product-List
router.post("/add-product-list",auth,userController.addToList)

//@desc merge cart in localStorage and user's cart
//@route POST /user/merge-cart
router.post("/merge-cart",auth,userController.mergeCart)

//@desc get list of products as cart with ids
//@route GET /user/get-cart
router.get("/get-cart",userController.getCart)

//@desc get comments of user
//@route GET /user/get-comments/:id
router.get("/get-comments/:id",auth,userController.getComments)

//@desc Delete specific comment
//@route DELETE /user/remove-comment/:id
router.delete("/remove-comment/:id",auth,userController.removeComment)

//@desc edit specific comment
//@route PUT /user/edit-comment/:id
router.put("/edit-comment/:id",auth,userController.editComment)

//@desc edit user data
//@route PUT /user/edit-data/:id
router.put("/edit-data/:id",auth,userController.editUser)

router.post("/email",sendEmail)


module.exports = router;