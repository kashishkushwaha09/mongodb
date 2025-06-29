const express=require('express');
const router=express.Router();
const productController=require('../controllers/productsController');
router.post('/',productController.postAddProduct);



module.exports=router;