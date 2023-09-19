import fs from "fs";

function createEvent(date, place) {
  function getDate() {
    return date;
  }

  function getPlace() {
    return place;
  }

  return { getDate, getPlace };
}
//-------weather data-------------

function createWeatherData(date, place, value, type, unit) {
  let event;
  event = createEvent(date, place);
  function getValue() {
    return value;
  }

  function getType() {
    return type;
  }

  function getUnit() {
    unit;
  }
  return { ...event, getValue, getType, getUnit };
}

export function createTemperature(date, place, value, type, unit) {
  let weatherData = createWeatherData(date, place, value, type, unit);

  return { ...weatherData };
}

export function createPrecipitation(
  date,
  place,
  value,
  type,
  unit,
  precipitation_type
) {
  let weatherData = createWeatherData(date, place, value, type, unit);

  function getPrecipitation() {
    return precipitation_type;
  }

  return { ...weatherData, getPrecipitation };
}

export function createWind(date, place, value, type, unit, directions) {
  let weatherData = createWeatherData(date, place, value, type, unit);

  function getDirections() {
    return directions;
  }

  return { ...weatherData, getDirections };
}

export function createCloud(date, place, value, type, unit) {
  let weatherData = createWeatherData(date, place, value, type, unit);

  return { ...weatherData };
}

//------Predictions----------

function createPredictionData(date, place, type, unit, min, max) {
  let prediction = createEvent(date, place);

  function getType() {
    return type;
  }

  function getUnit() {
    return unit;
  }

  function getMin() {
    return min;
  }

  function getMax() {
    return max;
  }
  return { ...prediction, getType, getUnit, getMin, getMax };
}

export function createTemperaturePredict(date, place, type, unit, min, max) {
  let weatherData = createPredictionData(date, place, type, unit, min, max);

  return { ...weatherData };
}

export function createPrecipitationPrediction(
  date,
  place,
  type,
  unit,
  min,
  max,
  precipitation_type
) {
  let weatherData = createPredictionData(date, place, type, unit, min, max);

  function getPrecipitation() {
    return precipitation_type;
  }

  return { ...weatherData, getPrecipitation };
}

export function createWindPrediction(
  date,
  place,
  type,
  unit,
  min,
  max,
  directions
) {
  let weatherData = createPredictionData(date, place, type, unit, min, max);

  function getDirections() {
    return directions;
  }

  return { ...weatherData, getDirections };
}

export function createCloudPrediction(date, place, type, unit, min, max) {
  let weatherData = createPredictionData(date, place, type, unit, min, max);

  return { ...weatherData };
}

function handleFileInput(event) {
  const fileInput = event.target;
  const selectedFile = fileInput.files[0]; // Get the first selected file

  if (selectedFile) {
    // Perform operations with the selected file
    console.log("Selected file:", selectedFile.name);
    // You can read the file contents or perform other actions as needed.
  }
}

// Attach the function to a file input element in your HTML
// const fileInput = document.getElementById("file-input"); // Assuming you have a file input element with id "file-input"
// fileInput.addEventListener("change", handleFileInput);
