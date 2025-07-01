const express=require('express');
const router=express.Router();
const orderController=require('../controllers/ordersController');
router.post('/',orderController.postOrders);
router.get('/:userId',orderController.getOrders);
module.exports=router;