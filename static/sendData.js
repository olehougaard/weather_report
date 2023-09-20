const formElement = document.getElementById('dataForm');
const typeSelection = document.getElementById('type');
const unitLabelElement = document.getElementById('unitLabel');
const windFields = document.getElementById('windFields');
const windDirectionLabelElement = document.getElementById('windDirectionLabel');
const windDirectionSelectElement = document.getElementById('wind_direction');
const windSpeedLabelElement = document.getElementById('windSpeedLabel');
const windSpeedInput = document.getElementById('wind_speed');
const precipitationFields = document.getElementById('precipitationFields');
const precipitationTypeLabelElement = document.getElementById('precipitationTypeLabel');
const precipitationTypeSelectElement = document.getElementById('precipitation_type');
const precipitationAmountLabelElement = document.getElementById('precipitationAmountLabel');
const precipitationAmountInput = document.getElementById('precipitation_amount');
const temperatureLabelElement = document.getElementById('temperatureLabel');
const temperatureInput = document.getElementById('temperature');
const cloudCoverageLabelElement = document.getElementById('cloudCoverageLabel');
const cloudCoverageInput = document.getElementById('cloud_coverage');
const locationSelect = document.getElementById('location');
const timeInput = document.getElementById('time');
const submitButton = document.querySelector('button[type="submit"]');

flatpickr(timeInput, {
    enableTime: true,
    dateFormat: "Y-m-d H:i:S",
    utc: true
});

typeSelection.addEventListener('change', () => {
    const selectedType = typeSelection.value;

    // Hide all fields and labels by default
    windFields.style.display = 'none';
    precipitationFields.style.display = 'none';
    temperatureLabelElement.style.display = 'none';
    temperatureInput.style.display = 'none';
    cloudCoverageLabelElement.style.display = 'none';
    cloudCoverageInput.style.display = 'none';
    unitLabelElement.style.display = 'none';
    timeInput.style.display = 'none';
    submitButton.style.display = 'none';

    // Show specific fields and labels based on the selected type
    switch (selectedType) {
        case 'wind':
            unitLabelElement.textContent = 'm/s';
            unitLabelElement.style.display = 'block';
            windFields.style.display = 'block';
            locationSelect.style.display = 'block';
            timeInput.style.display = 'block';
            submitButton.style.display = 'block';
            break;
        case 'precipitation':
            unitLabelElement.textContent = 'mm';
            unitLabelElement.style.display = 'block';
            precipitationFields.style.display = 'block';
            locationSelect.style.display = 'block';
            timeInput.style.display = 'block';
            submitButton.style.display = 'block';
            break;
        case 'temperature':
            unitLabelElement.textContent = '°C';
            unitLabelElement.style.display = 'block';
            temperatureLabelElement.style.display = 'block';
            temperatureInput.style.display = 'block';
            locationSelect.style.display = 'block';
            timeInput.style.display = 'block';
            submitButton.style.display = 'block';
            break;
        case 'cloud coverage':
            unitLabelElement.textContent = '%';
            unitLabelElement.style.display = 'block';
            cloudCoverageLabelElement.style.display = 'block';
            cloudCoverageInput.style.display = 'block';
            locationSelect.style.display = 'block';
            timeInput.style.display = 'block';
            submitButton.style.display = 'block';
            break;
        default:
            // If no valid type is selected, hide all fields and labels
            unitLabelElement.textContent = '';
            break;
    }
});

function navigateToPage(pageName) {
    window.location.href = `${pageName}.html`;
  }
  
  weatherButton.addEventListener("click", () => {
    navigateToPage("yesterday");
  });
  
  formButton.addEventListener("click", () => {
    navigateToPage("index");
  });

formElement.addEventListener('submit', (event) => {
    event.preventDefault();  // Prevent the default form submission behavior

    const formData = new FormData(formElement);
    const dataToSend = {};
    formData.forEach((value, key) => {
        dataToSend[key] = value;
    });

    fetch('http://localhost:8080/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
});
