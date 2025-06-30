const { ObjectId } = require('bson');

const getDb=require('../utils/db-connection').getDb;
class User{
    constructor(name,email,phone,password,id,cart){
        this.name=name;
        this.email=email;
        this.phone=phone;
        this.password=password;
         if (id) {
    this._id = new ObjectId(id); // only assign if id is passed
  }
  this.cart=cart;
    }
    save(){
       const db=getDb();
       let dbOp;
       if(this._id){
        // update one
        console.log(`updated user is ${this}`);
        dbOp=db.collection('users').updateOne({_id:this._id},{ $set: this });
       }else{
        console.log(`new user is ${this}`);
        dbOp=db.collection('users').insertOne(this);
       }
       return dbOp
       .then(result=>{
        console.log(result);
        return result;
       }).catch(err=>{
        console.log(err);
       })
    }
    // static fetchAll(){
    //     const db=getDb();
    //    return db.collection('products').find().toArray()
    //    .then(products=>{
    //     console.log(products);
    //     return products;
    //    }).catch(err=>{
    //     console.log(err);
    //    })
    // }
    static fetchById(userId){
        const db=getDb();
       return db.collection('users').findOne({ _id:new ObjectId(userId) })
       .then(product=>{
        console.log(product);
        return product;
       }).catch(err=>{
        console.log(err);
       })
    }
  
    //   static deleteById(prodId){
    //     const db=getDb();
    //    return db.collection('products').deleteOne({ _id:new ObjectId(prodId) })
    //    .then(result=>{
    //     console.log('Product deleted:'); 
     
    //    }).catch(err=>{
    //     console.log(err);
    //    })
    // }
    addToCart(product){
        if(!this.cart){
            this.cart={
                items:[]
            };
        }
       let index = this.cart.items.findIndex(cp => cp.productId.equals(product._id));
      
          if(index>=0){
            this.cart.items[index].quantity++;
            
            
          }else{
            this.cart.items.push({productId:new ObjectId(product._id),quantity:1});
          }
        
            
        
       
        const db=getDb();
        return db.collection('users').updateOne(
            {_id:new ObjectId(this._id)},
            {$set:{cart:this.cart}}
        )
        .then(result=>{
            console.log("cart is updated");
        console.log(result);
        return result;
       }).catch(err=>{
        console.log(err);
        throw err;
       })
    }
}
module.exports=User;