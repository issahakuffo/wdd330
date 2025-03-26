import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
<<<<<<< HEAD
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);

  }

}
=======
    return `
      <li class="product-card">
        <a href="product_pages/?product=${product.Id}">
          <img src="${product.Image}" alt="${product.Name}">
          <h2 class="card__brand">${product.Brand.Name}</h2>
          <h3 class="card__name">${product.NameWithoutBrand}</h3>
          <div class="product-card__price">
            <span class="original-price">$${product.ListPrice}</span>
            <span class="discount-price">$${product.FinalPrice}</span>
            <span class="discount-badge">${product.Discount} Off!</span>
          </div>
        </a>
      </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }
   

    renderList(list) {
        //const htmlStrings = list.map(productCardTemplate);
        //this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

}
>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be
