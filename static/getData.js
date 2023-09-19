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

      let minTempValue = Infinity;
      let maxTempValue = -Infinity;
      let totalPrecipitationValue = 0;
      let windSpeedSum = 0;
      let windSpeedCount = 0;
      let temperatureUnit = "";
      let precipitationUnit = "";
      let windSpeedUnit = "";

      recentDayData.forEach((item) => {
        switch (item.type) {
          case "temperature":
            minTempValue = Math.min(minTempValue, item.value);
            maxTempValue = Math.max(maxTempValue, item.value);
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

      minTemperatureDiv.textContent = `Minimum Temperature: ${minTempValue} ${temperatureUnit}`;
      maxTemperatureDiv.textContent = `Maximum Temperature: ${maxTempValue} ${temperatureUnit}`;
      totalPrecipitationDiv.textContent = `Total Precipitation: ${totalPrecipitation} ${precipitationUnit}`;
      averageWindSpeedDiv.textContent = `Average Wind Speed: ${averageWindSpeed} ${windSpeedUnit}`;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Initial data update
updateWeatherData();
