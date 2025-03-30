import CheckoutProcess from "./CheckoutProcess.mjs";
import ExternalServices from "./ExternalServices.mjs";

const checkout = new CheckoutProcess("so-cart", "#checkout");
const dataSource = new ExternalServices();

document.addEventListener("DOMContentLoaded", async () => {
    checkout.init();
    checkout.displayOrderTotals();
    
    
    const form = document.querySelector("#checkout-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const order = await checkout.checkout(form);
        const response = await dataSource.checkout(order);
        console.log(response);
    });
    }
);