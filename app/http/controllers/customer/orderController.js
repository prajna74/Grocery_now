const moment=require("moment");
const { es } = require("date-fns/locale");
const orders=require("./../../../models/order");

function orderController(){
    return{
       index:(req,res)=>{

       },
       store:async (req,res)=>{
           const {address,phone}=req.body;
           const newOrder=new orders({
               addrees:address,
               phoneNumber:phone,
               customerId:req.session.user.user._id,
               items:req.session.cart.items,
               totalItem:req.session.cart.totalQty,
               totalAmount:req.session.cart.totalAmount
           });
                
               await newOrder.save().then((result)=>{
                req.session.cart=null;
                res.redirect(`/customer/index/${newOrder._id}`);
               }).catch((err)=>{
                   console.log(err);
               res.redirect("/");
               });
        },
        index:async (req,res)=>{
          const order=await orders.findById(req.params.id);
          res.render("customer/order",{order:order});
        },
        orderConfirm:(req,res)=>{
              req.flash("success","Order placed successfully!!");
              res.redirect("/customer/orderList");
             
        },
        orderList:async (req,res)=>{
            const order=await orders.find({customerId:req.session.user.user._id}).sort({createdAt:-1});
            res.render("customer/orderList",{orders:order,moment:moment});
        },
        track:async (req,res)=>{
          const order=await orders.findById(req.params.id);
          res.render("customer/track",{order:order});
        }
    }
}
module.exports=orderController;