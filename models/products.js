const mongoose = require("mongoose");

const productSchema=new mongoose.Schema({
   title:{
      type:String,
      required:true
   },
   price:{
      type:Number,
      required:true
   },
   description:{
      type:String,
      required:true
   },
   imageUrl:{
      type:String,
      required:true
   },
   userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
   }
});

module.exports = mongoose.model('Product', productSchema);

// const { ObjectId } = require('bson');

// const getDb=require('../utils/db-connection').getDb;
// class Product{
//     constructor(title,price,description,imageUrl,id,userId){
//         this.title=title;
//         this.price=price;
//         this.description=description;
//         this.imageUrl=imageUrl;
//         if(id!==null)
//         this._id=new ObjectId(id);
//         this.userId=userId;
//     }
//     save(){
//        const db=getDb();
//        let dbOp;
//        if(this._id){
//         // update one
//         console.log(`old product is ${this}`);
//         dbOp=db.collection('products').updateOne({_id:this._id},{ $set: this });
//        }else{
//         console.log(`new product is ${this}`);
//         dbOp=db.collection('products').insertOne(this);
//        }
//        return dbOp
//        .then(result=>{
//         console.log(result);
//        }).catch(err=>{
//         console.log(err);
//        })
//     }
//     static fetchAll(){
//         const db=getDb();
//        return db.collection('products').find().toArray()
//        .then(products=>{
//         console.log(products);
//         return products;
//        }).catch(err=>{
//         console.log(err);
//        })
//     }
//     static fetchById(prodId){
//         const db=getDb();
//        return db.collection('products').findOne({ _id:new ObjectId(prodId) })
//        .then(product=>{
//         console.log(product);
//         return product;
//        }).catch(err=>{
//         console.log(err);
//        })
//     }
//     static findOneAndUpdate(prodId,product){
//         const db=getDb();
//        return db.collection('products').findOneAndUpdate(
//         { _id:new ObjectId(prodId) },
//      { $set: product }, // update
//   { returnDocument: 'after' } )
//        .then(product=>{
//         console.log(product);
//         return product;
//        }).catch(err=>{
//         console.log(err);
//        })
//     }
//       static deleteById(prodId){
//         const db=getDb();
//        return db.collection('products').deleteOne({ _id:new ObjectId(prodId) })
//        .then(result=>{
//         console.log('Product deleted:'); 
     
//        }).catch(err=>{
//         console.log(err);
//        })
//     }
// }
// module.exports=Product;