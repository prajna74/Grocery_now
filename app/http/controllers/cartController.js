function cartController(){
     return{
         index:(req,res)=>{
           res.render("customer/cart");
         },
         update:(req,res)=>{
             if(!req.session.cart)
             {
                 const cart={
                     items:{},
                     totalQty:0,
                     totalAmount:0
                 };
                 req.session.cart=cart;
             }
            let cartt=req.session.cart;
             if(!cartt.items[req.body.grocery._id])
             {
                 cartt.items[req.body.grocery._id]={
                     item:req.body.grocery,
                     qty:req.body.qty,
                     amount:(req.body.qty)*(req.body.grocery.price)
                 }
                 cartt.totalQty+=1;
                 cartt.totalAmount+=(req.body.grocery.price*req.body.qty);
             }
             else{
                 cartt.items[req.body.grocery._id].qty+=req.body.qty;
                 cartt.items[req.body.grocery._id].amount+=(req.body.grocery.price*req.body.qty);
                 cartt.totalQty+=1;
                 cartt.totalAmount=cartt.totalAmount+(req.body.grocery.price*req.body.qty);
             }
             req.session.cart=cartt;
             return res.json({totalQty:req.session.cart.totalQty});
         },
         deleteItem:(req,res)=>{
             req.session.cart.totalAmount-=req.session.cart.items[req.params.id].amount;
             req.session.cart.totalQty-=1;
             delete(req.session.cart.items[req.params.id]);
             res.redirect("/cart");
         }
     }
}

module.exports=cartController;