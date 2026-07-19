import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ProductData();

const listElement = document.querySelector(".product-list");

const myList = new ProductList(category, dataSource, listElement);

myList.init();

// Optional: Update the page heading
const heading = document.querySelector("h2");
heading.textContent = `Top Products: ${category
  .replace("-", " ")
  .replace(/\b\w/g, c => c.toUpperCase())}`;