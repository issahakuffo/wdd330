import { ProductData } from "./ProductData.mjs";
import { ProductData } from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();