const User=require('../models/users');
module.exports=(req,res,next)=>{
 User.fetchById(req.body.userId)
 .then(user=>{
    req.user=new User(user.name,user.email,user.phone,user.password,user._id,user.cart);
    next();
 })
 .catch(err=>console.log(err));
}