require('dotenv').config();
const express=require('express');
const app=express();
const mongoConnect=require('./utils/db-connection').mongoConnect;
const productRoute=require('./routes/productRoute');
app.use(express.json());
app.use('/api/products',productRoute);
mongoConnect(()=>{
    app.listen(3000,()=>{
    console.log("app listen to port 3000"); 
})
})
