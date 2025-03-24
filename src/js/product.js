import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

<<<<<<< HEAD
loadHeaderFooter();

=======
const productId = getParam("products");
console.log(productId);
>>>>>>> 48b3727a951052a7f1668971606958f59f93c002
const dataSource = new ProductData("tents");

const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);

product.init();
