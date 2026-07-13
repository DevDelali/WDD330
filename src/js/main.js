import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const myList = new ProductList("tents", dataSource, listElement);
myList.init();

const alert = new Alert();
alert.showAlerts();