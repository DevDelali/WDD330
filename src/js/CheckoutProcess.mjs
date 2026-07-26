import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
        this.bindZipListener();
        this.bindFormSubmit();
    }

    bindZipListener() {
        const zipElement = document.querySelector("#zip");

        if (zipElement) {
            zipElement.addEventListener("blur", () => {
                if (zipElement.value.trim()) {
                    this.calculateOrderTotal();
                }
            });
        }
    }

    bindFormSubmit() {
        const formElement = document.querySelector("#checkout-form");

        if (!formElement) {
            return;
        }

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this.checkout(formElement);
        });
    }

    calculateItemSubTotal() {
        this.subTotal = this.list.reduce(
            (sum, item) => sum + Number(item.FinalPrice || 0),
            0,
        );

        const subtotalElement = document.querySelector(`${this.outputSelector} #subTotal`);
        if (subtotalElement) {
            subtotalElement.textContent = `Subtotal: $${this.subTotal.toFixed(2)}`;
        }
    }

    calculateOrderTotal() {
        this.tax = this.subTotal * 0.06;
        this.shipping = this.list.length > 0 ? 10 + Math.max(0, this.list.length - 1) * 2 : 0;
        this.orderTotal = this.subTotal + this.tax + this.shipping;

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const taxElement = document.querySelector(`${this.outputSelector} #tax`);
        const shippingElement = document.querySelector(`${this.outputSelector} #shipping`);
        const totalElement = document.querySelector(`${this.outputSelector} #total`);

        if (taxElement) {
            taxElement.textContent = `Tax: $${this.tax.toFixed(2)}`;
        }

        if (shippingElement) {
            shippingElement.textContent = `Shipping Estimate: $${this.shipping.toFixed(2)}`;
        }

        if (totalElement) {
            totalElement.textContent = `Order Total: $${this.orderTotal.toFixed(2)}`;
        }
    }

    formDataToJSON(formElement) {
        const formData = new FormData(formElement);
        const convertedJSON = {};

        formData.forEach((value, key) => {
            convertedJSON[key] = value;
        });

        return convertedJSON;
    }

    packageItems(items) {
        return items.map((item) => ({
            id: item.id || item.ID || item.itemId || "",
            name: item.Name || item.name || "",
            price: Number(item.FinalPrice || 0),
            quantity: 1,
        }));
    }

    async checkout(formElement) {
        try {
            this.calculateOrderTotal();
            const formValues = this.formDataToJSON(formElement);

            const order = {
                orderDate: new Date().toISOString(),
                fname: formValues.fname || "",
                lname: formValues.lname || "",
                street: formValues.address || "",
                city: formValues.city || "",
                state: formValues.state || "",
                zip: formValues.zip || "",
                cardNumber: formValues.card || formValues.cardNumber || "",
                expiration: formValues.exp || formValues.expiration || "",
                cvv: formValues.cvv || "",
                items: this.packageItems(this.list),
                orderTotal: Number(this.orderTotal.toFixed(2)),
                shipping: Number(this.shipping.toFixed(2)),
                tax: Number(this.tax.toFixed(2)),
            };

            const response = await fetch("https://wdd330-backend.onrender.com/3000/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });

            if (!response.ok) {
                throw new Error(`Server returned ${response.status}`);
            }

            const result = await response.json();
            console.log("Order submitted", result);

            setLocalStorage(this.key, []);
            window.location.href = "./success.html";
        } catch (error) {
            console.error("Checkout submit failed", error);
        }
    }
}
