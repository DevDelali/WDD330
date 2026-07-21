import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";
import { getWeatherRecommendation, highlightWeatherMatch } from "./weatherRecommend.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const listElement = document.querySelector(".product-list");
const pageTitle = document.querySelector(".products h2");
const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "tents";

function formatCategoryName(value) {
    return value
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

if (pageTitle) {
    pageTitle.textContent = `${formatCategoryName(category)} Products`;
}

if (listElement) {
    const dataSource = new ProductData(category);
    const myList = new ProductList(category, dataSource, listElement);
    myList.init();
}

const alert = new Alert();
alert.showAlerts();

async function initWeather() {
    try {
        const weather = await getWeatherRecommendation();
        highlightWeatherMatch(weather);
    } catch {
        // location not available or denied, skip the feature
    }
}

initWeather();
loadHeaderFooter();


