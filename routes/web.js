const homeController=require("./../app/http/controllers/homeController");
const cartController=require("./../app/http/controllers/cartController");
const orderController=require("./../app/http/controllers/customer/orderController");
const adminController=require("./../app/http/controllers/admin/adminController");
const order = require("../app/models/order");
function initRoutes(app){
      app.get("/",homeController().index);
      app.get("/register",homeController().register);
      app.get("/login",homeController().login);
      app.post("/register",homeController().registerPost);
      app.post("/login",homeController().loginPost);
      app.get("/logout",homeController().logout);
      app.post("/update-cart",cartController().update);
      app.get("/cart",cartController().index);
      app.post("/customer/order",orderController().store)
      app.get("/customer/index/:id",orderController().index);
      app.get("/customer/orderConfirm/:id",orderController().orderConfirm);
      app.get("/deleteItem/:id",cartController().deleteItem)
      app.get("/customer/orderList",orderController().orderList)
      app.get("/admin/orderList",adminController().orderList)
      app.post("/admin/order/status",adminController().statusChange);
      app.get("/customer/track/:id",orderController().track);
}

module.exports=initRoutes;