import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

function clearCart() {
  setLocalStorage("so-cart", []);
  renderCartContents();
}

function removeItem(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  const items = Array.isArray(cartItems) ? cartItems : [cartItems];
  items.splice(index, 1);
  setLocalStorage("so-cart", items);
  renderCartContents();
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const items = Array.isArray(cartItems) ? cartItems : [cartItems];
  const htmlItems = items.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".cart-card__remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      removeItem(index);
    });
  });
}

function cartItemTemplate(item, index) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  <button class='cart-card__remove' data-index='${index}'>Remove</button>
</li>`;

  return newItem;
}

document.querySelector("#clearCart")?.addEventListener("click", clearCart);
renderCartContents();