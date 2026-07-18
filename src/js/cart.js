import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cartList = document.querySelector(".product-list");
const clearButton = document.querySelector("#clearCart");
const cartFooter = document.querySelector(".cart-footer");
const cartTotal = document.querySelector(".cart-total");
const shoppingCart = new ShoppingCart(
  cartList,
  clearButton,
  cartFooter,
  cartTotal,
);
shoppingCart.init();

