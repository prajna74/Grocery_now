import axios from "axios";
const increment=document.querySelectorAll(".inc");
const decrement=document.querySelectorAll(".dec");
const cartQty=document.getElementById("cartQty")
for(let i=0;i<increment.length;i++)
{
    const initialprice=increment[i].dataset.price;
    increment[i].addEventListener("click",()=>{
        const q=document.getElementById(`quant${i}`);
        const price=document.getElementById(`price${i}`);
        q.innerText=parseInt(q.innerText)+1;
        price.innerText=parseInt(initialprice)*parseInt(q.innerText);
    })
}
for(let i=0;i<decrement.length;i++)
{
    const initialprice=increment[i].dataset.price;
   decrement[i].addEventListener("click",()=>{
        const q=document.getElementById(`quant${i}`);
        const price=document.getElementById(`price${i}`);
        if(q.innerText>1){
        q.innerText=parseInt(q.innerText)-1;
        price.innerText=parseInt(initialprice)*parseInt(q.innerText);
        }
    })
}

//cart Update
function updateCart(grocery,qty)
{
    axios.post("/update-cart",{
        grocery:grocery,
        qty:qty}).then((res)=>{
           const tqt=res.data.totalQty;
           cartQty.innerText=tqt;
    }).catch((err)=>{
        alert(err);
    });
}
const add_to_cart=document.querySelectorAll(".add-to-cart");
    for(let i=0;i<add_to_cart.length;i++){
      add_to_cart[i].addEventListener("click",()=>{
          const grocery=JSON.parse(add_to_cart[i].dataset.grocery);
          const qty=parseInt(document.getElementById(`quant${i}`).innerText);
          updateCart(grocery,qty);
      });
}

const alertMsg=document.getElementById("success-msg");
if(alertMsg){
setTimeout(() => {
    alertMsg.remove();
}, 1000)
};


let statuses=document.querySelectorAll(".status-line");
let hiddenInput=document.getElementById("orderStatus");
let order=hiddenInput?hiddenInput.value:"";
order=JSON.parse(order);


function updateStatus(order){
    let flag=true;
     statuses.forEach((status)=>{
         let dataProp=status.dataset.status;
         if(flag)
         {
             status.classList.add("completed");
         }
         if(order.status==dataProp)
         {
           
             if(status.nextElementSibling){
              flag=false;
             status.nextElementSibling.classList.add("current");
             }
         }
     })
}

updateStatus(order);