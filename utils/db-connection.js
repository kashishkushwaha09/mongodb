
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URL // Replace with your DB URI

const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("Connected to MongoDB via Mongoose");
  } catch (err) {
    console.error("Mongoose connection failed:", err);
    process.exit(1);
  }
};

module.exports = connectToMongo;


// const mongodb=require('mongodb');
// const MongoClient=mongodb.MongoClient;
// let _db;
// const mongoConnect=callback=>{
// MongoClient.connect(
//     process.env.MONGO_URL
// ).then(client=>{
//     console.log("connected to mongodb successfully");
//     _db=client.db();
//     callback();
// }).catch((error)=>{
//   console.log(error);
//   throw error;
// });
// }
// const getDb=()=>{
//     if(_db){
//         return _db;
//     }
//     throw "No database found !";
// }
// exports.mongoConnect=mongoConnect;
// exports.getDb=getDb;

