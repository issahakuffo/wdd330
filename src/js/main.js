<<<<<<< HEAD
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
=======
import  ProductData  from "./ProductData.mjs";
import  ProductList  from "./ProductList.mjs";
import  {loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();
>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be
