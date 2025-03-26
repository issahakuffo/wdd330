import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
    document
<<<<<<< HEAD
<<<<<<< HEAD
      .getElementById("add-to-cart")
=======
      .getElementById("addToCart")
>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be
=======
      .getElementById("addToCart")
>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
<<<<<<< HEAD
<<<<<<< HEAD
  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const euroPrice = new Intl.NumberFormat('de-DE',
    {
      style: 'currency', currency: 'EUR',
    }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
=======
=======
>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be
  document.querySelector("h2").textContent = product.Brand?.Name || 'No Brand';
  document.querySelector("h3").textContent = product.NameWithoutBrand || 'No Name';

  const productImage = document.querySelector(".divider img");
  productImage.src = product.Image || 'default.jpg';
  productImage.alt = product.NameWithoutBrand || 'No Name';

  document.querySelector(".product-card__price").textContent = product.FinalPrice || 'No Price';
  document.querySelector(".product__color").textContent = product.Colors?.[0]?.ColorName || 'No Color';
  document.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple || 'No Description';

  document.getElementById("addToCart").dataset.id = product.Id || 'No ID';
<<<<<<< HEAD
>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be
=======
>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be
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