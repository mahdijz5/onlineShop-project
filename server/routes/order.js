const {Router} = require("express");
const router = new Router();

const orderController =  require("../controllers/orderController")
const {auth} =  require("../middlewares/authontication")

//@desc create order 
//@route Post /order/creae-order
router.post('/create-order',auth,orderController.createOrder)

//@desc create order 
//@route Post /order/creae-order
router.get('/get-orders',auth,orderController.getOrders)

module.exports = router