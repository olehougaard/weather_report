// DOM elements
const weatherButton = document.getElementById("weatherButton");
const form = document.getElementById("formButton");
const hourSelector = document.getElementById("hourSelector");
const citySelector = document.getElementById("city");
const forecast = document.getElementById("forecast");

// Event listener for city selection change
citySelector.addEventListener("change", () => {
  const selectedCity = citySelector.value;
  fetchWeatherData(selectedCity);
});

function navigateToPage(pageName) {
  window.location.href = `${pageName}.html`;
}

weatherButton.addEventListener("click", () => {
  navigateToPage("yesterday");
});

formButton.addEventListener("click", () => {
  navigateToPage("form");
});

// Function to fetch weather data based on the selected city
function fetchWeatherData(city) {
  const apiUrl = `http://localhost:8080/forecast/${city}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // const jsonString = JSON.stringify(data, undefined, 4);
      // forecast.textContent = jsonString;

      function generateWeatherRows() {
        return data.map(item => {
            let details = "";

            if (item.type === "precipitation") {
                details = "Precipitation Types: " + item.precipitation_types.join(", ");
            } else if (item.type === "wind speed") {
                details = "Wind Directions: " + item.directions.join(", ");
            }

            return `
                <tr>
                    <td>${item.type}</td>
                    <td>${item.time}</td>
                    <td>${item.unit}</td>
                    <td>${item.from}</td>
                    <td>${item.to}</td>
                    <td>${details}</td>
                </tr>
            `;
        }).join("");
    }

    // Insert weather data into the table
    document.getElementById("weatherData").innerHTML = generateWeatherRows(data);
    })
    .catch((error) => console.error("Error fetching forecast data:", error));
}

fetchWeatherData(citySelector.value);
