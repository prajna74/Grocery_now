const orders=require("./../../../models/order");
const moment=require("moment");
function adminController(){
    return{
       orderList:async (req,res)=>{
          const order=await orders.find().sort({created:-1}).populate("customerId","-password");
          res.render("admin/orderList",{orders:order,moment:moment});
       },
       statusChange:async (req,res)=>{
           const order=await orders.findById(req.body.orderId);
           order.status=req.body.status;
           order.save().then((result)=>{
             res.redirect("/admin/orderList");
           }).catch((err)=>{
              console.log(err);
              res.redirect("/");
           })
       }
    }
}

module.exports=adminController;