const Users=require("./../../models/user");
const bcrypt=require("bcrypt");
const Groceries=require("./../../models/grocerie");
function homeController(){
    return{
        index:async (req,res)=>{
            const groceries=await Groceries.find();
            res.render("home",{groceries:groceries});
        },
        register:(req,res)=>{
               res.render("auth/register");
        },
        login:(req,res)=>{
            res.render("auth/login");
        },
        registerPost:async(req,res)=>{
            const {name,email,password}=req.body;
            if(!name || !email || !password)
            {
                req.flash("error","All fields required");
                res.redirect("/register");
            }
            const hashedPassword=await bcrypt.hash(password,10);
            const user=new Users({
                name:name,
                email:email,
                password:hashedPassword
            });
            user.save().then(()=>{
                res.redirect("/login");
            })
        },
        loginPost:async (req,res)=>{
            const {email,password} =req.body;
            if(!email || !password)
            {
                req.flash("error","All fields required");
                res.redirect("/login");
            }
            const user=await Users.findOne({email:email});
            try{
            if(user!=null)
            {
                if(await bcrypt.compare(password,user.password))
                {
                    req.session.user={user:user};
                    res.redirect("/");
                }
                else{
                    req.flash("error","Wrong password");
                    res.redirect("/login");
                }
            }
            else{
                req.flash("error","No user with email is present.Please register!")
               res.redirect("/login");
            }
        }
        catch(err)
        {
            res.redirect("/register");
        }
        },
    logout: (req,res)=>{
     req.session.cart=null;
     req.session.destroy();
        res.redirect("/");
    }
  }
}

module.exports=homeController;