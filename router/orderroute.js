const express=require('express');
const router=express.Router();
const ordercontroller=require('../controller/ordercontroller');
const Restuarant = require('../model/Restuarant');
const requireAuth=require('../middleware/requireAuth');
 router.use(requireAuth);
 const crypto=require("crypto");
router.post('/order',ordercontroller.order_post);
 router.get('/order',ordercontroller.order_get);
 router.get('/restuarant',ordercontroller.restuarant_get)
router.get('/:restaurantId', async (req, res) => {
    
    const { restaurantId } = req.params;
    console.log("bawarchi")
  console.log({restaurantId})
    try {
      const restaurant = await Restuarant.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      const menuItems = restaurant.menuItems;
      res.json({ menuItems });
    } catch (error) {
      console.error('Error fetching menu:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.post('/orderdet',ordercontroller.orderdet_post);
module.exports=router;

router.post("/verify",(req,res)=>{
  console.log("verify lo unna");
  try {
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
console.log(razorpay_order_id);
console.log(razorpay_payment_id);
console.log(razorpay_signature)
    const sign=razorpay_order_id+"|"+razorpay_payment_id;
    const expectedsign=crypto.createHmac("sha256", process.env.KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

    console.log(razorpay_signature);
    console.log(expectedsign);
    if (razorpay_signature === expectedsign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
  }
})