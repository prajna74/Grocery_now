const express=require("express");
const app=express();
const ejs=require("ejs");
const expressLayouts=require("express-layouts");
const mongoose=require("mongoose");
const session=require("express-session");
const mongoStore=require("connect-mongo");
const flash=require("express-flash");


app.use(express.static("public"));

app.set("view engine","ejs");
app.set("views","./resources/views");
app.use(expressLayouts);
app.set("layout","layouts/layout.ejs")
const connection=mongoose.connect("mongodb://localhost/grocery");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const initRoutes=require("./routes/web");
app.use(session({
       secret:"abcdefghhh",
       resave:false,
       saveUninitialized:false,
       store:mongoStore.create({
           mongoUrl:"mongodb://localhost/grocery",
           ttl:1000*24*60*60
       }),
       cookie:{maxAge:1000*24*60*60}
}))

app.use(flash());
app.use((req,res,next)=>{
    res.locals.session=req.session;
    res.locals.user=req.session.user;
    next();
})

initRoutes(app);

app.listen(process.env.PORT|| 3000);