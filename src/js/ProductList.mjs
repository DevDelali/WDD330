import { renderListWithTemplate } from "./utils.mjs";

function getProductImage(product) {
  if (product.Image) {
    return product.Image.replace("../images/", "/images/");
  }
  if (product.Images?.PrimaryMedium) {
    return product.Images.PrimaryMedium;
  }
  if (product.Images?.PrimaryLarge) {
    return product.Images.PrimaryLarge;
  }
  return "/images/placeholder.jpg";
}

function productCardTemplate(product) {
  const imagePath = product.Image.replace("../images/", "/images/");
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${imagePath}" alt="${product.NameWithoutBrand}" />
      <h3>${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}