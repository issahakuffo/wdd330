import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

const category = getParam("category");
console.log("Category: ",category);
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");

const listing = new ProductList(category, dataSource, element);
listing.init();