import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
    const checkout = new CheckoutProcess("so-cart", ".order-summary");
    checkout.init();
});
