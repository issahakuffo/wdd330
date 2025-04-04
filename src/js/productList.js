import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { showModal } from "./modal.mjs";

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");

// Render product list with Quick View buttons
async function renderProductList() {
  try {
    // Fetch products for the given category
    const products = await dataSource.getData(category);
    // Render the product list
    element.innerHTML = products
      .map(
        (product) => `
      <li class="product-item" data-id="${product.id}">
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}">
        <p>$${product.price}</p>
        <button class="quick-view" data-id="${product.id}">Quick View</button>
      </li>
    `,
      )
      .join("");
  } catch (error) {
    console.error("Error fetching products:", error); // Keep this for error handling
  }
}

// Event delegation for Quick View button clicks
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("quick-view")) {
    try {
      const productId = event.target.dataset.id;
      const product = await dataSource.getProductById(productId);
      showModal(`
        <div class="modal-content">
          <span class="close-button">&times;</span>
          <h3>${product.name}</h3>
          <img src="${product.image}" alt="${product.name}">
          <p>${product.description}</p>
          <p>Price: $${product.price}</p>
        </div>
      `);
    } catch (error) {
      console.error("Error fetching product details:", error); // Keep this for error handling
    }
  }
});

// Initialize the product list
renderProductList();
