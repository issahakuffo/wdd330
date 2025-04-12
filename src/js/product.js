import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const category = getParam("category");
const dataSource = new ExternalServices(category);
const productID = getParam("product");

const product = new ProductDetails(category,productID, dataSource);
product.init();

window.document.getElementById("add-to-cart").addEventListener("click",()=>{
product.addProductToCart()
});