import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const query = getParam("query")?.trim() || "";
const summary = document.querySelector(".search-summary");
const resultsElement = document.querySelector(".product-list");
const dataSource = new ProductData("tents");

async function displaySearchResults() {
  if (!query) {
    summary.textContent = "Enter a product name, brand, or keyword to search.";
    return;
  }

  try {
    const results = await dataSource.searchProducts(query);
    const productList = new ProductList("tents", dataSource, resultsElement);
    productList.renderList(results);
    summary.textContent = results.length
      ? `${results.length} result${results.length === 1 ? "" : "s"} for "${query}".`
      : `No products found for "${query}". Try another search.`;
  } catch {
    summary.textContent = "Search results could not be loaded. Please try again.";
  }
}

displaySearchResults();
loadHeaderFooter();
