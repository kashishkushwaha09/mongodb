const express=require('express');
const router=express.Router();
const orderController=require('../controllers/ordersController');
const checkUser=require('../middlewares/checkUser');
router.post('/',checkUser,orderController.postOrders);
router.get('/:userId',orderController.getOrders);
module.exports=router;