import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
    <li class="product-card">
        <a href="product_pages/${product.Url}" class="cart-card__image">
            <img src="${product.Image}" alt="${product.Name}"/>
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card__name">${product.Name}</h3>
            <p class="cart-card__price">$${product.FinalPrice}</p>
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
        renderListWithTemplate(productCardTemplate, this.listElement, list, "beforeend", true);
    }

}