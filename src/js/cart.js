import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

// Load the header and footer into the page
loadHeaderFooter();

// Function to render cart contents
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // If cart is empty, display a message and return early
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
    document.querySelector("#cart-total").textContent = "Total: $0.00"; // Display total price as 0 if empty
    return;
  }

  // Map cart items to HTML using the template
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  // Insert the HTML into the product list
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Calculate and display the total price
  updateCartTotal(cartItems);

  // Add event listeners to remove buttons for each cart item
  addRemoveButtonsListeners();
}

// Function to generate HTML for each cart item
function cartItemTemplate(item) {
  // Assuming `item.quantity` exists and holds the correct quantity
  const quantity = item.quantity || 1; // Default to 1 if quantity is not available

  // Return the HTML string for the cart item
  const newItem = `
    <li class="cart-card divider" data-id="${item.Id}">
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
      <p class="cart-card__quantity">qty: <span>${quantity}</span></p>
      <p class="cart-card__price">$${item.FinalPrice}</p>

      <button class="remove-from-cart">Remove</button>
    </li>`;

  return newItem;
}

// Function to add event listeners to each "Remove" button
function addRemoveButtonsListeners() {
  const removeButtons = document.querySelectorAll(".remove-from-cart");

  removeButtons.forEach((button) => {
    button.addEventListener("click", removeProductFromCart);
  });
}

// Function to calculate and update the total price
function updateCartTotal(cartItems) {
  let totalPrice = 0;

  // Calculate the total price by summing up the price of each item (including quantity)
  cartItems.forEach((item) => {
    totalPrice += item.FinalPrice * (item.quantity || 1); // Multiply by quantity, default to 1 if not defined
  });

  // Format the total price as currency (US Dollars in this case)
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);

  // Display the total price in the cart
  document.querySelector("#cart-total").textContent =
    `Total: ${formattedTotal}`;
}

// Function to remove a product from the cart
function removeProductFromCart(event) {
  const itemId = event.target.closest("li").getAttribute("data-id"); // Get product ID from closest <li> element
  const cartItems = getLocalStorage("so-cart") || [];

  // Filter out the product from the cart based on product ID
  const updatedCartItems = cartItems.filter((item) => item.Id !== itemId);

  // Save the updated cart back to localStorage
  setLocalStorage("so-cart", updatedCartItems);

  // Re-render the cart contents after removal
  renderCartContents();
}

// Call the function to render the cart on page load
renderCartContents();

// Optional: Prevent default behavior for links (in case you don't want them to navigate anywhere)
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => e.preventDefault());
});
