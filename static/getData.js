// DOM elements
const cityDropdown = document.getElementById("citySelector");
const forecastButton = document.getElementById("forecastButton");
const minTemperatureDiv = document.getElementById("minTempDisplay");
const maxTemperatureDiv = document.getElementById("maxTempDisplay");
const totalPrecipitationDiv = document.getElementById(
  "totalPrecipitationDisplay"
);
const averageWindSpeedDiv = document.getElementById("averageWindSpeedDisplay");

// Function to navigate to a new page
function navigateToPage(pageName) {
  window.location.href = `${pageName}.html`;
}

// Event listener for city selection change
cityDropdown.addEventListener("change", () => {
  updateWeatherData();
});

// Event listeners for buttons
forecastButton.addEventListener("click", () => {
  navigateToPage("index");
});

formButton.addEventListener("click", () => {
  navigateToPage("form");
});

// Function to fetch and update weather data
function updateWeatherData() {
  const apiEndpoint = `http://localhost:8080/data/${cityDropdown.value}`;

  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      const currentDay = new Date();
      const recentDayData = data.filter((item) => {
        const itemDate = new Date(item.time);
        const timeDifference = currentDay - itemDate;
        const millisecondsInADay = 24 * 60 * 60 * 1000;
        return (
          item.place === cityDropdown.value &&
          timeDifference < millisecondsInADay
        );
      });

      // Define an initial accumulator object with default values
      const initialValue = {
        minTempValue: Infinity,
        maxTempValue: -Infinity,
        totalPrecipitationValue: 0,
        windSpeedSum: 0,
        windSpeedCount: 0,
        temperatureUnit: "",
        precipitationUnit: "",
        windSpeedUnit: "",
      };

      // Use the reduce method to calculate the values
      const weatherData = recentDayData.reduce((accumulator, item) => {
        switch (item.type) {
          case "temperature":
            accumulator.minTempValue = Math.min(
              accumulator.minTempValue,
              item.value
            );
            accumulator.maxTempValue = Math.max(
              accumulator.maxTempValue,
              item.value
            );
            accumulator.temperatureUnit = item.unit;
            break;
          case "precipitation":
            accumulator.totalPrecipitationValue += item.value;
            accumulator.precipitationUnit = item.unit;
            break;
          case "wind speed":
            accumulator.windSpeedSum += item.value;
            accumulator.windSpeedCount += 1;
            accumulator.windSpeedUnit = item.unit;
            break;
        }
        return accumulator;
      }, initialValue);

      // Extract individual values from the weatherData object
      const {
        minTempValue,
        maxTempValue,
        totalPrecipitationValue,
        windSpeedSum,
        windSpeedCount,
        temperatureUnit,
        precipitationUnit,
        windSpeedUnit,
      } = weatherData;

      const averageWindSpeed = (windSpeedSum / windSpeedCount).toFixed(2);
      const totalPrecipitation = totalPrecipitationValue.toFixed(2);

      function updateWeatherInfo(infoDiv, value, unit) {
        infoDiv.textContent = `${infoDiv.dataset.label}: ${value} ${unit}`;
      }

      updateWeatherInfo(minTemperatureDiv, minTempValue, temperatureUnit);
      updateWeatherInfo(maxTemperatureDiv, maxTempValue, temperatureUnit);
      updateWeatherInfo(
        totalPrecipitationDiv,
        totalPrecipitation,
        precipitationUnit
      );
      updateWeatherInfo(averageWindSpeedDiv, averageWindSpeed, windSpeedUnit);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

updateWeatherData();
