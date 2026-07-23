import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.subTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSubTotal();
    }

    calculateItemSubTotal() {
        this.subTotal = this.list.reduce(
            (sum, item) => sum + Number.parseFloat(item.FinalPrice || 0),
            0,
        );

        const subtotalElement = document.querySelector(`${this.outputSelector} #subTotal`);
        if (subtotalElement) {
            subtotalElement.innerText = `Subtotal: $${this.subTotal.toFixed(2)}`;
        }
    }

    calculateOrderTotal() {
        this.tax = this.subTotal * 0.06;
        this.shipping = 10 + Math.max(0, this.list.length - 1) * 2;
        this.orderTotal = this.subTotal + this.tax + this.shipping;

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const taxElement = document.querySelector(`${this.outputSelector} #tax`);
        const shippingElement = document.querySelector(`${this.outputSelector} #shipping`);
        const totalElement = document.querySelector(`${this.outputSelector} #total`);


        tax.innerText = `$${this.tax.toFixed(2)}`;
    }
}