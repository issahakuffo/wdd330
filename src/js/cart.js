import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems.length > 0) {
  const htmlItems = cartItems.map(cartItemTemplate).join("");
  document.querySelector(".product-list").innerHTML = htmlItems;
  console.log("tent");
  console.log("cart", cartItems);
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    const totalHtml = `<p class="cart-total">Total: $${total.toFixed(2)}</p>`;
    document.querySelector(".product-list").insertAdjacentHTML('beforeend', totalHtml);
  } else {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty</p>";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
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

renderCartContents();
