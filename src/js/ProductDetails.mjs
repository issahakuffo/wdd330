import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product details from the data source
    this.product = await this.dataSource.findProductById(this.productId);
    
    // Once data is fetched, render product details
    this.renderProductDetails();
    
    // Add event listener to the "Add to Cart" button
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));

  }

  // Add the product to the shopping cart
  addProductToCart() {
    // Retrieve the current cart items from localStorage, or initialize it as an empty array if it doesn't exist
    const cartItems = getLocalStorage("so-cart") || [];
  
    // Check if the product already exists in the cart
    const existingProductIndex = cartItems.findIndex(item => item.Id === this.product.Id);
  
    if (existingProductIndex !== -1) {
      // If the product exists in the cart, increase the quantity
      cartItems[existingProductIndex].quantity += 1;
      
      // Alert the user that the quantity has been updated
      alert(`${this.product.NameWithoutBrand} has been added to your cart. Quantity: ${cartItems[existingProductIndex].quantity}`);
    } else {
      // If the product does not exist, add it to the cart with quantity set to 1
      this.product.quantity = 1;
      cartItems.push(this.product);
      
      // Alert the user that the product has been added to the cart
      alert(`${this.product.NameWithoutBrand} has been added to your cart.`);
    }
  
    // Save the updated cart back to localStorage
    setLocalStorage("so-cart", cartItems);
  
    // Optionally, render the updated cart total or other UI updates
    renderCartTotalItems();
  }

  // Render the product details on the page
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

// Function to generate and display the product details HTML
function productDetailsTemplate(product) {
  // Update product category (capitalize first letter)
  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  
  // Set brand and product name
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  // Set product image
  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;

  // Format price to EUR
  const euroPrice = new Intl.NumberFormat('de-DE', {
    style: 'currency', currency: 'EUR',
  }).format(Number(product.FinalPrice) * 0.85);
  
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  
  // Set product color
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  
  // Set product description
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  // Set the data-id for the "Add to Cart" button
  document.querySelector("#add-to-cart").dataset.id = product.Id;

 // Check if the "Remove from Cart" button exists before setting its data-id
 const removeFromCartButton = document.querySelector("#remove-from-cart");
 if (removeFromCartButton) {
   removeFromCartButton.dataset.id = product.Id;
 }
}

// Function to render the updated total number of items in the cart
function renderCartTotalItems() {
  // Retrieve cart items from localStorage
  const cartItems = getLocalStorage("so-cart") || [];

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Update the cart icon or cart count in the UI
  const cartCountElement = document.querySelector("#cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}


// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }