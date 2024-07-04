const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt');
const validator=require('validator');
const personSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

personSchema.statics.signup=async function(email,password){
    if(!email||!password){
        throw Error("please fill every field");
    }
    
    if(!validator.isEmail(email)){
        throw Error("Email is not valid");
    }
    if(!validator.isStrongPassword(password)){
        throw Error("password is not strong enough");
    }

    const exists=await this.findOne({email});
    if(exists){
        throw Error("email exists already");
    }
const salt=await bcrypt.genSalt(10);
const hash= await bcrypt.hash(password,salt);
const user=await this.create({email,password:hash});
return user;

}

personSchema.statics.login=async function(email,password){
    if(!email||!password){
        throw Error("please fill every field");
    }
    const user= await this.findOne({email});
    if(!user){
        throw Error('user doesnt exist');
    }
    const match=await bcrypt.compare(password,user.password);
    if(!match){
        throw Error("Incorrect Password");
    }
    return user;
}

module.exports=mongoose.model('Person',personSchema);