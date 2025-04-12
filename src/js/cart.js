import { getLocalStorage,setLocalStorage } from "./utils.mjs";


export function getProductCartCount() {
  const cartItems = getLocalStorage("so-cart");
  return cartItems.length;
}

export function renderCartTotalItems() {
  const cartItems = getLocalStorage("so-cart");
  //console.log(JSON.stringify(cartItems));
  const totalItems = cartItems.length;
  document.querySelector(".cart-count").textContent = totalItems;
}

function renderCartContents() {
  try{
    const cartItems = getLocalStorage("so-cart");
    let htmlItems;
    if(cartItems.length > 0){
       htmlItems = cartItems.map((item) => cartItemTemplate(item));
    } 
   
    document.querySelector(".product-list").innerHTML = htmlItems;

    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector(".cart-total").textContent = `Total: $${total}`;
  } catch (error) {
    console.error("Error rendering cart contents", error);
  }

}
window.deleteFromCart = function(id) {
  const cartItems = getLocalStorage("so-cart");
  if(cartItems.length > 1){
    const newCart = cartItems.filter(item => item[0].Id !== id);
    setLocalStorage("so-cart", newCart);
  } else {
    setLocalStorage("so-cart", []);
  }
  renderCartContents(); // refresh the cart after deletion
};
function cartItemTemplate(item) {

  let newItem
  try{
    if(item[0].Image != undefined){
      newItem = `<li class="cart-card divider" style="position:relative;">
      <button id="delete" style="width:10px;padding:15px;height:50px; display: block; position: absolute; right:2px; top:2px; color:red; background-color:white;" onclick="deleteFromCart('${item[0].Id}')">x</button>
       <a href="#" class="cart-card__image">
         <img
           src="${item[0].Image}"
           alt="${item[0].Name}"
         />
       </a>
       <a href="#">
         <h2 class="card__name">${item[0].Name}</h2>
       </a>
       <p class="cart-card__color">${item[0].Colors[0].ColorName}</p>
       <p class="cart-card__quantity">qty: 1</p>
       <p class="cart-card__price">$${item[0].FinalPrice}</p>
     </li>`;
    }
    else{
      newItem = `<li class="cart-card divider" style="position:relative;">
      <button id="delete" style="width:10px;padding:15px;height:50px; display: block; position: absolute; right:2px; top:2px; color:red; background-color:white;" onclick="deleteFromCart('${item[0].Id}')">x</button>
      <a href="#" class="cart-card__image">
        <img
          src="${item[0].Images.PrimarySmall}"
          alt="${item[0].Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item[0].Name}</h2>
      </a>
      <p class="cart-card__color">${item[0].Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item[0].FinalPrice}</p>
    </li>`;
    }
   
  }
  catch(e){
   console.log("Error");
}

  return newItem;
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("cart")) {
    renderCartContents();
  }
});
