const express=require('express');
const router=express.Router();
const checkUser=require('../middlewares/checkUser');
const cartController=require('../controllers/cartController');
router.post('/',checkUser,cartController.postCart);
router.get('/',checkUser,cartController.getCart);
router.delete('/',checkUser,cartController.deleteCart);
module.exports=router;