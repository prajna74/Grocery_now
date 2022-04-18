const mongoose=require("mongoose");
const orderSchema=mongoose.Schema({
    addrees:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    paymentMode:{
        type:String,
        default:"COD",
    },
    status:{
        type:String,
        default:"order_placed"
    },
    items:{
        type:Object,
        required:true
    },
    totalItem:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number
    }
},{timestamps:true});

module.exports=mongoose.model("order",orderSchema);