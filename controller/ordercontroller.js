const Order = require('../model/Order');
const Restuarant = require('../model/Restuarant');
const razorpay=require("razorpay");
const crypt=require("crypto");
module.exports.order_post = async (req, res) => {
    console.log("hello");
  const { customerid, cart, totalprice,totalquantity } = req.body;

  try {
    // Create a new order using the Order model and save it to the database
    const order = await Order.create({
      customerid,
      cart,
      totalprice,
      totalQuantity:totalquantity
    });

 
    res.status(201).json(order);
    
  } catch (error) {
    console.error(error);
     
    res.status(500).send('Internal Server Error');
  }
};

module.exports.order_get=async(req,res)=>{
  try {
    const cart=await Order.find();
    res.status(202).json({cart});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

module.exports.restuarant_get=async(req,res)=>{
  try {
    const restuarants=await Restuarant.find();
    res.status(201).json({restuarants})
  } catch (error) {
    console.log(error);
    res.status(404).json({error});
  }
}

 module.exports.orderdet_post=async(req,res)=>{
  const  {amount}=req.body;
  console.log(amount);
  try {
    
  
      const instance=new razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
      })

      const options={
        amount:amount*100,
        currency:"INR",
        receipt:crypt.randomBytes(10).toString("hex")
      }

      instance.orders.create(options,(error,order)=>{
        if(error){
          console.log(error);
          res.status(500).json({error:"something went wrong"});
        }
        res.status(200).json({data:order});
      })
    } catch (error) {
    console.log(error);
    res.status(500).json({error:"Interenal server Error"});
    }
 }