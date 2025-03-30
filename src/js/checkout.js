import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", "#checkout");

document.addEventListener("DOMContentLoaded", async () => {
  checkout.init();
  checkout.displayOrderTotals();

  document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.querySelector("#checkout-form");
    const chk_status = form.checkValidity();
    form.reportValidity();
    if (chk_status) checkout.checkout(form);
  });
});
