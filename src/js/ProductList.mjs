import { renderListWithTemplate } from "./utils.mjs";




export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  
  async init() {
    const list = await this.dataSource.getData(this.category);
    console.log(list);
    this.renderList(list);
   // document.querySelector(".title").textContent = this.category;
   
  }

  renderList(list) {
    var _this = this;
    function productCardTemplate(product) {
      return `
        <li class="product-card">
          <a href="/product_pages/?product=${product.Id}&category=${_this.category}">
            <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
            <h3>${product.Brand.Name}</h3>
            <p>${product.NameWithoutBrand}</p>
            <p class="product-card__price">$${product.FinalPrice}</p>
          </a>
        </li>
        `;
    }
    //Added new templatecard for tent product
    function productCardTemplateTent(product) {
      return `
        <li class="product-card">
          <a href="/product_pages/?product=${product.Id}&category=${_this.category}">
            <img src="${product.Image}" alt="${product.Name}">
            <h3>${product.Brand.Name}</h3>
            <p>${product.NameWithoutBrand}</p>
            <p class="product-card__price">$${product.FinalPrice}</p>
          </a>
        </li>
        `;
    }
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    //Added new condition to handle tent issues 
    if(this.category == "tents"){
      renderListWithTemplate(productCardTemplateTent, this.listElement, list);
    }
    else{
     renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  }

}