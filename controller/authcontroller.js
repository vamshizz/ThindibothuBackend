const Person=require('../model/Customer');
const jwt=require('jsonwebtoken')

const createtoken=(_id)=>{
    return jwt.sign({_id},'vk',{expiresIn:'3d'})
}
module.exports.login_get=async(req,res)=>{
    res.json({msg:"login get"})
}
module.exports.login_post=async(req,res)=>{
     const {email,password}=req.body;
     console.log("login ki vachindhi")
     try {
        const user=await Person.login(email,password);
        const token=createtoken(user._id);
        res.status(200).json({user,token});
     } catch (error) {
        res.status(400).json({error:error.message});
     }
    
         
}
module.exports.signup_get=async(req,res)=>{
    res.json({msg:"signup get"})
}
module.exports.signup_post=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await Person.signup(email,password);
        const token=createtoken(user._id);
        res.status(200).json({user,token});
    } catch (error) {
        res.status(400).json({error:error.message});
    }

}

