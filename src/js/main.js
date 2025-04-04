import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();

// Handle newsletter form submission
document
  .getElementById("newsletter-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const messageElement = document.getElementById("newsletter-message");

    if (email) {
      // Simulate a successful subscription
      messageElement.textContent =
        "Thank you for subscribing to our newsletter!";
      messageElement.classList.remove("hide");
      messageElement.style.color = "green";
      document.getElementById("newsletter-form").reset();
    } else {
      messageElement.textContent = "Please enter a valid email address.";
      messageElement.classList.remove("hide");
      messageElement.style.color = "red";
    }
  });
