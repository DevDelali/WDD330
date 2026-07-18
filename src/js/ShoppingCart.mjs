import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item, index) {
    return `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors?.[0]?.ColorName ?? ""}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  <button class='cart-card__remove' data-index='${index}'>Remove</button>
</li>`;
}

export default class ShoppingCart {
    constructor(listElement, clearButton, footerElement, totalElement) {
        this.listElement = listElement;
        this.clearButton = clearButton;
        this.footerElement = footerElement;
        this.totalElement = totalElement;
    }

    async init() {
        this.clearButton?.addEventListener("click", this.clearCart.bind(this));
        this.renderCartContents();
    }

    getCartItems() {
        const cartItems = getLocalStorage("so-cart") || [];
        return Array.isArray(cartItems) ? cartItems : [cartItems];
    }

    saveCartItems(items) {
        setLocalStorage("so-cart", items);
    }

    clearCart() {
        this.saveCartItems([]);
        this.renderCartContents();
    }

    removeItem(index) {
        const items = this.getCartItems();
        items.splice(index, 1);
        this.saveCartItems(items);
        this.renderCartContents();
    }

    renderCartContents() {
        const items = this.getCartItems();
        renderListWithTemplate(cartItemTemplate, this.listElement, items, "afterbegin", true);
        this.renderCartTotal(items);
        this.attachRemoveListeners();
    }

    renderCartTotal(items) {
        if (!this.footerElement || !this.totalElement) return;

        if (items.length === 0) {
            this.footerElement.classList.add("hide");
            return;
        }

        const total = items.reduce(
            (sum, item) => sum + Number.parseFloat(item.FinalPrice || 0),
            0,
        );
        this.totalElement.textContent = `Total: $${total.toFixed(2)}`;
        this.footerElement.classList.remove("hide");
    }

    attachRemoveListeners() {
        this.listElement.querySelectorAll(".cart-card__remove").forEach((btn) => {
            btn.addEventListener("click", (event) => {
                const index = Number(event.currentTarget.dataset.index);
                this.removeItem(index);
            });
        });
    }
}
