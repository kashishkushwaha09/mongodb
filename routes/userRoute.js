const express=require('express');
const router=express.Router();
const userController=require('../controllers/usersController');
router.post('/',userController.addUser);
// router.get('/',productController.getProducts);
router.get('/:id',userController.getUserId);
// router.put('/',productController.updateProduct);
// router.delete('/:id',productController.deleteProduct);
module.exports=router;