export default class Alert {
    async showAlerts() {
        const response = await fetch("../json/alerts.json");
        const alerts = await response.json();

        const section = document.createElement("section");
        section.className = "alert-list";

        for (let i = 0; i < alerts.length; i++) {
            const p = document.createElement("p");

            p.innerText = alerts[i].message;
            p.style.backgroundColor = alerts[i].background;
            p.style.color = alerts[i].color;

            section.appendChild(p);
        }

        const main = document.querySelector("main");
        main.prepend(section);
    }
}