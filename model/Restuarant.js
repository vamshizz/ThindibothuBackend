const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const RestuarantSchema=new Schema({
    
    name:{
        type:String,
        required:true
    },
    menuItems:{
        type:[Schema.Types.Mixed],
        required:true
       },
       image:{
        type:String,
        required:true
       }
})

module.exports=mongoose.model('Restuarant',RestuarantSchema)