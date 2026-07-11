export async function getWeatherRecommendation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("no geolocation");
      return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`
        );
        const data = await res.json();
        resolve(data.current);
      } catch (err) {
        reject(err);
      }
    }, reject);
  });
}

function getSeasonRating(name) {
  if (name.includes("4-Season")) return 4;
  if (name.includes("3-Season")) return 3;
  return 2;
}

function getSeverity(weather) {
  const temp = weather.temperature_2m;
  const wind = weather.wind_speed_10m;

  if (temp < 5 || wind > 30) return 4;
  if (temp < 12 || wind > 20) return 3;
  if (temp < 20 || wind > 10) return 2;
  return 1;
}

function getMessage(rating, severity) {
  const diff = rating - severity;

  if (diff === 0) return "Suited for current conditions";
  if (diff === 1) return "Extra weather protection included";
  if (diff >= 2) return "More coverage than today's forecast needs";
  if (diff === -1) return "Limited protection for current conditions";
  return "Not recommended for current conditions";
}

export function highlightWeatherMatch(weather) {
  const severity = getSeverity(weather);
  const cards = document.querySelectorAll(".product-card");

  cards.forEach((card) => {
    const nameEl = card.querySelector(".card__name");
    const link = card.querySelector("a");
    if (!nameEl || !link) return;

    const rating = getSeasonRating(nameEl.textContent);
    const badge = document.createElement("p");
    badge.textContent = getMessage(rating, severity);
    badge.className = "weather-note";
    link.appendChild(badge);
  });
}