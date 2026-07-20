import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  const imagePath = product.Image.replace("../images/", "/images/");
  const color = product.Colors?.[0]?.ColorName || "Not specified";

  return `
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider" src="${imagePath}" alt="${product.Name}" />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${color}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart">Add to Cart</button>
    </div>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      document.querySelector(".product-detail").innerHTML = "<p>Product not found.</p>";
      return;
    }

    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const currentCart = getLocalStorage("so-cart") || [];
    const cartItems = Array.isArray(currentCart) ? currentCart : [currentCart];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    document.querySelector(".product-detail").innerHTML = productDetailsTemplate(this.product);
    document.title = `Sleep Outside | ${this.product.Name}`;
  }
}
