import { renderListWithTemplate } from "./utils.mjs";

function getProductImage(product) {
  if (product.Images?.PrimaryMedium) {
    return product.Images.PrimaryMedium;
  }
  if (product.Images?.PrimaryLarge) {
    return product.Images.PrimaryLarge;
  }
  if (product.Image) {
    return product.Image.replace("../images/", "/images/");
  }
  return "/images/placeholder.jpg";
}

function productCardTemplate(product) {
  const imagePath = getProductImage(product);
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
    this.bindSortEvents(list);
  }

  sortList(list, sortBy) {
    const sortedList = [...list];

    if (sortBy === "name") {
      return sortedList.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
    }

    if (sortBy === "price") {
      return sortedList.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }

    return sortedList;
  }

  bindSortEvents(list) {
    const sortSelect = document.getElementById("sortBy");

    if (!sortSelect) return;

    sortSelect.addEventListener("change", (event) => {
      const selectedValue = event.target.value;
      const sortedList = this.sortList(list, selectedValue);
      this.renderList(sortedList);
    });
  }

  renderList(list) {
    this.listElement.innerHTML = "";
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}
