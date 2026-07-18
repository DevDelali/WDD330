import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cartList = document.querySelector(".product-list");
const clearButton = document.querySelector("#clearCart");
const shoppingCart = new ShoppingCart(cartList, clearButton);
shoppingCart.init();

