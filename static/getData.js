const city = document.getElementById("city");
const forecastButton = document.getElementById("forecastButton");
const minTemperatureDiv = document.getElementById("minTemperature");
const maxTemperatureDiv = document.getElementById("maxTemperature");
const totalPrecipitationDiv = document.getElementById("totalPrecipitation");
const averageWindSpeedDiv = document.getElementById("averageWindSpeed");
const hourlyForecastDiv = document.getElementById("hourlyForecast");

function navigateToPage(pageName) {
  window.location.href = `${pageName}.html`;
}

function updateWeatherData() {
  const apiUrl = `http://localhost:8080/forecast/${city}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const currentDate = new Date();
      const lastDayData = data.filter((item) => {
        const itemDate = new Date(item.time);
        return (
          item.place === city.value &&
          currentDate - itemDate < 24 * 60 * 60 * 1000
        );
      });

      let minTemperatureValue = Infinity;
      let maxTemperatureValue = -Infinity;
      let totalPrecipitationValue = 0;
      let windSpeedSum = 0;
      let windSpeedCount = 0;
      let temperatureUnit = "";
      let precipitationUnit = "";
      let windSpeedUnit = "";

      lastDayData.forEach((item) => {
        switch (item.type) {
          case "temperature":
            minTemperatureValue =
              item.value < minTemperatureValue
                ? item.value
                : minTemperatureValue;
            maxTemperatureValue =
              item.value > maxTemperatureValue
                ? item.value
                : maxTemperatureValue;
            temperatureUnit = item.unit;
            break;
          case "precipitation":
            totalPrecipitationValue += item.value;
            precipitationUnit = item.unit;
            break;
          case "wind speed":
            windSpeedSum += item.value;
            windSpeedCount += 1;
            windSpeedUnit = item.unit;
            break;
        }
      });

      const averageWindSpeed = (windSpeedSum / windSpeedCount).toFixed(2);
      const totalPrecipitation = totalPrecipitationValue.toFixed(2);

      minTemperatureDiv.textContent = `Min Temperature: ${minTemperatureValue} ${temperatureUnit}`;
      maxTemperatureDiv.textContent = `Max Temperature: ${maxTemperatureValue} ${temperatureUnit}`;
      totalPrecipitationDiv.textContent = `Total Precipitation: ${totalPrecipitation} ${precipitationUnit}`;
      averageWindSpeedDiv.textContent = `Average Wind Speed: ${averageWindSpeed} ${windSpeedUnit}`;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

city.addEventListener("change", () => {
  city.value;
  updateWeatherData();
});

forecastButton.addEventListener("click", () => {
  navigateToPage("index");
});

formButton.addEventListener("click", () => {
  navigateToPage("form");
});

updateWeatherData();
