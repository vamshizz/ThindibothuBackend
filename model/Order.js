const  mongoose=require("mongoose")
const Schema=mongoose.Schema

const OrderSchema=new Schema({
    customerid:{
        type: Schema.Types.ObjectId,  
        ref: 'Person',  
        required: true,
    },
    cart:{
        type: [Schema.Types.Mixed] ,
        required: true,
    },
    totalprice:{
        type: Number,
        required: true,
    },
    totalQuantity:{
        type:Number,
        required:true
    },
    OrderDate:{
        type: Date,
        default: Date.now,
    }
})

module.exports=mongoose.model('Order',OrderSchema);