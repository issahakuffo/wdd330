// Our first task is to read the product data out of the tents.json file (the current data source).
// Import the ProductData module into main.js and create an instance of it.
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const productData = new ProductData('tents');
const element = document.querySelector('.product-list');
const productList = new ProductList('tents', productData, element);
productList.init();