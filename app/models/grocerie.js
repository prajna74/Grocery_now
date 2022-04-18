const mongoose=require("mongoose");
const grocerySchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    quantity:{
        type:Number
    },
    price:{
        type:Number
    }
});
module.exports=mongoose.model("grocerie",grocerySchema);