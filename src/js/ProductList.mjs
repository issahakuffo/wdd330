import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
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
      this.products = [];
    }

    async init() {
        const list = await this.dataSource.getData();
        this.products = list;
        this.renderList(list);
        this.addSortingListener();
    }

    sortProducts(method) {
        let sortedProducts = [...this.products];
        switch(method) {
            case 'name':
                sortedProducts.sort((a, b) => 
                    a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
                break;
            case 'price':
                sortedProducts.sort((a, b) => 
                    a.FinalPrice - b.FinalPrice);
                break;
        }
        this.renderList(sortedProducts);
    }

    addSortingListener() {
        const sortSelect = document.getElementById('sort-select');
        sortSelect.addEventListener('change', (e) => {
            this.sortProducts(e.target.value);
        });
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

}
