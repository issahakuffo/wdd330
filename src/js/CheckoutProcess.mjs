import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    this.calculateItemSubTotal();
    this.calculateItemShipping();
    this.calculateItemTax();
    this.calculateOrderTotal();
  }

  calculateItemSubTotal() {
    const itemCount = this.list.length;
    const itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);

    this.itemTotal = itemTotal;
    this.itemCount = itemCount;
  }

  calculateItemShipping() {
    if (this.itemCount === 0) {
      this.shipping = 0;
    } else if (this.itemCount === 1) {
      this.shipping = 10;
    } else {
      this.shipping = 10 + (this.itemCount - 1) * 2;
    }
  }

  calculateItemTax() {
    this.tax = this.itemTotal * 0.06;
  }

  calculateOrderTotal() {
    this.orderTotal = this.itemTotal + this.shipping + this.tax;
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const itemTotalDisplay = document.querySelector(
      `${this.outputSelector} #subtotal`,
    );
    itemTotalDisplay.innerText = `$${this.itemTotal.toFixed(2)}`;

    const shippingDisplay = document.querySelector(
      `${this.outputSelector} #shipping`,
    );

    shippingDisplay.innerText = `$${this.shipping.toFixed(2)}`;

    const taxDisplay = document.querySelector(`${this.outputSelector} #tax`);

    taxDisplay.innerText = `$${this.tax.toFixed(2)}`;

    const orderTotalDisplay = document.querySelector(
      `${this.outputSelector} #order-total`,
    );

    orderTotalDisplay.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  // takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
  packageItems(items) {
    const itemsToCheckout = items.map((item) => {
      return {
        id: item.Id,
        name: item.Name,
        price: item.FinalPrice,
        quantity: 1,
      };
    });
    return itemsToCheckout;
  }

  // takes the form data and converts it to a JSON object
  formDataToJSON(formData) {
    const jsonObject = {};
    for (const [key, value] of formData.entries()) {
      if (key === "items") {
        jsonObject[key] = this.packageItems(this.list);
      } else {
        jsonObject[key] = value;
      }
    }
    return jsonObject;
  }

  async checkout(form) {
    const formData = new FormData(form);
    const order = this.formDataToJSON(formData);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal.toFixed(2);
    order.shipping = this.shipping;
    order.tax = this.tax.toFixed(2);
    order.items = this.packageItems(this.list);
    return order;
  }
}
