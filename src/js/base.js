import { loadHeaderFooter } from "./utils.mjs";
import { getProductCartCount, renderCartTotalItems} from "./cart";

document.addEventListener("DOMContentLoaded", async () => {
    await loadHeaderFooter();
    renderCartTotalItems();
});