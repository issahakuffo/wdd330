<<<<<<< HEAD
<<<<<<< HEAD
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
=======
=======
>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be
import  ProductData  from "./ProductData.mjs";
import  ProductList  from "./ProductList.mjs";
import  {loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

<<<<<<< HEAD
productList.init();
>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be
=======
productList.init();
>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be
