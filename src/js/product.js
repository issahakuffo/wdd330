import { loadHeaderFooter } from "./utils.mjs";
import ProductDetails from "./productDetails.mjs"; // Ensure the correct import

loadHeaderFooter();

const productId = new URLSearchParams(window.location.search).get("productId");
if (productId) {
  // Use the productDetails instance to avoid the unused variable warning
  new ProductDetails(productId, null).init(); // Replace `null` with the appropriate data source
}
