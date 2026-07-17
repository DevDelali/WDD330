import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";
import { getWeatherRecommendation, highlightWeatherMatch } from "./weatherRecommend.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const myList = new ProductList("tents", dataSource, listElement);
myList.init();

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

