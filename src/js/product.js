import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";


const dataSource = new ExternalServices("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();