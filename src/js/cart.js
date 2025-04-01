import { getLocalStorage } from "./utils.mjs";


export function getProductCartCount() {
  const cartItems = getLocalStorage("so-cart");
  return cartItems.length;
}

export function renderCartTotalItems() {
  const cartItems = getLocalStorage("so-cart");
  const totalItems = cartItems.length;
  document.querySelector(".cart-count").textContent = totalItems;
}

function renderCartContents() {
  try{
    const cartItems = getLocalStorage("so-cart");
    console.log(cartItems); //Fixed on Individual1
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    console.log(htmlItems);
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector(".cart-total").textContent = `Total: $${total}`;
  } catch (error) {
    console.error("Error rendering cart contents", error);
  }

}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("cart")) {
    renderCartContents();
  }
});