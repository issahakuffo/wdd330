import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { renderCartTotalItems } from "./cart";

export default class ProductDetails {

  constructor(category,productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.category = category;
  }


  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId,this.category);
    console.log("Product",this.product)

    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
    /*document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));*/
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    console.log(JSON.stringify(cartItems));
    setLocalStorage("so-cart", cartItems);
    renderCartTotalItems();
  }

  renderProductDetails() {
    if(this.category == "tents"){
      productDetailsTemplateTent(this.product);
    }
    else{
      productDetailsTemplate(this.product)
    }
    
  }
}

function productDetailsTemplate(product) {
  console.log(JSON.stringify(product));
  document.querySelector("h2").textContent = product[0].Name.charAt(0).toUpperCase() + product[0].Name.slice(1);;
  document.querySelector("#p-brand").textContent = product[0].Brand.Name;
  document.querySelector("#p-name").textContent = product[0].NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product[0].Images.PrimaryExtraLarge;
  productImage.alt = product[0].NameWithoutBrand;
  const originalPrice = product[0].SuggestedRetailPrice;
  const discountedPrice = product[0].FinalPrice;
  const euroOriginalPrice = new Intl.NumberFormat('de-DE',
    {
      style: 'currency', currency: 'EUR',
    }).format(Number(originalPrice) * 0.85);
  const euroPrice = new Intl.NumberFormat('de-DE',
    {
      style: 'currency', currency: 'EUR',
    }).format(Number(discountedPrice) * 0.85);

  const discount = Math.round((1 - (discountedPrice / originalPrice)) * 100);

  const discountText = document.querySelector("#p-discount");

  if (discount > 0) {
    discountText.textContent = `-${discount}%`;
    // añadirle la clase discount para que se vea el texto en rojo
    discountText.classList.add("discount");

    // añadirle la clase para que se tache el texto del precio original
    const originalPriceText = document.querySelector("#p-original-price");
    originalPriceText.classList.add("original-price");
    originalPriceText.classList.remove("hidden");
  }
  document.querySelector("#p-original-price").textContent = `${euroOriginalPrice}`;
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}
function productDetailsTemplateTent(product) {
  console.log(product);
  document.querySelector("h2").textContent = product[0].Name.charAt(0).toUpperCase() + product[0].Name.slice(1);
  document.querySelector("#p-brand").textContent = product[0].Name;
  document.querySelector("#p-name").textContent = product[0].NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product[0].Image;
  productImage.alt = product[0].NameWithoutBrand;
  const originalPrice = product[0].SuggestedRetailPrice;
  const discountedPrice = product[0].FinalPrice;
  const euroOriginalPrice = new Intl.NumberFormat('de-DE',
    {
      style: 'currency', currency: 'EUR',
    }).format(Number(originalPrice) * 0.85);
  const euroPrice = new Intl.NumberFormat('de-DE',
    {
      style: 'currency', currency: 'EUR',
    }).format(Number(discountedPrice) * 0.85);

  const discount = Math.round((1 - (discountedPrice / originalPrice)) * 100);

  const discountText = document.querySelector("#p-discount");

  if (discount > 0) {
    discountText.textContent = `-${discount}%`;
    // añadirle la clase discount para que se vea el texto en rojo
    discountText.classList.add("discount");

    // añadirle la clase para que se tache el texto del precio original
    const originalPriceText = document.querySelector("#p-original-price");
    originalPriceText.classList.add("original-price");
    originalPriceText.classList.remove("hidden");
  }
  document.querySelector("#p-original-price").textContent = `${euroOriginalPrice}`;
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  document.querySelector("#p-color").textContent = product[0].Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product[0].DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product[0].Id;
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