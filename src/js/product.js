import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { renderBreadcrumb } from "./Breadcrumbs.mjs";

const productId = getParam("product");
const dataSource = new ExternalServices("tents");

const product = new ProductDetails(productId, dataSource);
product.init();
renderBreadcrumb([{ label: "Tents" }]);
loadHeaderFooter();
