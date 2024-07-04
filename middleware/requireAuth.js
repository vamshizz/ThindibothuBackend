const jwt=require('jsonwebtoken');
const Person=require('../model/Customer');

const requireAuth= async(req,res,next)=>{
    const {authorization}=req.headers
    

    if(!authorization){
        return res.status(401).json({eror:'authorization token required'});
    }
    const token=authorization.split(' ')[1];
    console.log(token);
    try {
        const{_id}=jwt.verify(token,'vk');
        console.log(_id);
        req.user=await Person.findOne({_id}).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error:'request is not authorized'})
    }
}
module.exports=requireAuth;