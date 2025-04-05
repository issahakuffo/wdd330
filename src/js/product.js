import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from './utils.mjs';
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ProductData('tents');
const productID = getParam('product');
console.log('productID ' + productID);
const product = new ProductDetails(productID, dataSource);
product.init();
const addtoCartbut = document.querySelector("#addToCart");

function addProductToCart(produ) {
  setLocalStorage("so-cart", produ);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button

  addtoCartbut.addEventListener("click", (event)=>{
   addToCartHandler(event)
  });
