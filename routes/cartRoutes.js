const express=require('express');
const router=express.Router();
const checkUser=require('../middlewares/checkUser');
const cartController=require('../controllers/cartController');
router.post('/',checkUser,cartController.postCart);

module.exports=router;