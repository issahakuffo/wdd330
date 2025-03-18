import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource) {
      this.productId = productId;
      this.product = {};
      this.dataSource = dataSource;
    }
  
    async init() {
      // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
      this.product = await this.dataSource.findProductById(this.productId);
      // the product details are needed before rendering the HTML
      this.renderProductDetails();
      // once the HTML is rendered, add a listener to the Add to Cart button
      // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
      document
        .getElementById('addToCart')
        .addEventListener('click', this.addProductToCart.bind(this));
    }
  
    addProductToCart() {
      const cartItems = getLocalStorage("so-cart") || [];
      cartItems.push(this.product);
      setLocalStorage("so-cart", cartItems);
    }
  
    renderProductDetails() {
      productDetailsTemplate(this.product);
    }
  }