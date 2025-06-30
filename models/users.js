const { ObjectId } = require('bson');

const getDb=require('../utils/db-connection').getDb;
class User{
    constructor(name,email,phone,password,id){
        this.name=name;
        this.email=email;
        this.phone=phone;
        this.password=password;
         if (id) {
    this._id = new ObjectId(id); // only assign if id is passed
  }
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
}
module.exports=User;