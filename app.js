const express=require('express');
const app=express();
const path = require('path');
const mongoose=require('mongoose');
const authroute=require('./router/authroute');
const orderroute=require('./router/orderroute');
const Restaurant=require('./model/Restuarant')
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
const dbURI=process.env.DATABASE;
mongoose.connect(dbURI,{useNewurlParser:true, useUnifiedTopology:true})
.then((result)=>{
    app.listen(4000,()=>{
        console.log("listening on port!!");
    })
})
.catch((err) => {
    console.log(err);
 });

 app.use(cors());
 app.use(cors({ origin: '*' }));

 app.use('/images', express.static(path.join(__dirname, 'images')));
 

  
 
app.get('/',(req,res)=>{
     res.json({mssg:"welcome to the app"})
})

app.use('/food',authroute);
app.use('/food',orderroute)