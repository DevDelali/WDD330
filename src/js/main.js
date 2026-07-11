import { getWeatherRecommendation, highlightWeatherMatch } from "./weatherRecommend.mjs";

async function init() {
  try {
    const weather = await getWeatherRecommendation();
    highlightWeatherMatch(weather);
  } catch {
    // location not available or denied, skip the feature
  }
}

init();
