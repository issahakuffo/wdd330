import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
<<<<<<< HEAD
<<<<<<< HEAD

loadHeaderFooter();
=======
>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be

=======

>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be
<<<<<<< HEAD
loadHeaderFooter();

=======
const productId = getParam("products");
console.log(productId);
>>>>>>> 48b3727a951052a7f1668971606958f59f93c002
const dataSource = new ProductData("tents");
const productID = getParam("product");

<<<<<<< HEAD
<<<<<<< HEAD
const product = new ProductDetails(productID, dataSource);
product.init();
=======
=======
>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);

product.init();
<<<<<<< HEAD
>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be
=======
>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be
