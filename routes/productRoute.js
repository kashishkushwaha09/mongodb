const express=require('express');
const router=express.Router();
const productController=require('../controllers/productsController');
router.post('/',productController.postAddProduct);
router.get('/',productController.getProducts);
router.get('/:id',productController.getProductId);
router.put('/',productController.updateProduct);
router.delete('/:id',productController.deleteProduct);
module.exports=router;