export default (window) => {
  const document = window.document;
  const table_body = document.getElementById("weather_data");
  const listeners = [];

  const listen = (l) => listeners.push(l);

  const displayError = (e) => {
    const msg_board = document.getElementById("error_messages");
    msg_board.innerText = e;
  };

  const prompt = window.prompt.bind(window);

  const updateCurrent = (model) => {
    console.log("> Updating Current");
    // model.dump()

    // Start Table Row
    let row = document.createElement("tr");

    // Update individual View Sections
    let temp = model.temperature;
    updateCurrentTemperature(row, temp);

    let wind = model.wind_speed;
    updateCurrentWindSpeed(row, wind);
    
    let perc = model.percipitation;
    updateCurrentPercipitation(row, perc);

    let cloud = model.cloud_coverage;
    // updateCurrentCloudCoverage(cloud)

    // updateCurrentValueUnit(row, cloud);

    // End Table Row
    table_body.appendChild(row);
    };

    function updateCurrentTemperature(row, t_data) {
    console.log("Temperature is fucked");

    let td = document.createElement("td");
    td.textContent = `${t_data.value}${t_data.unit}`;

    row.appendChild(td);
  }

    function updateCurrentPercipitation(row, p_data) {
    console.log("Percipitation not updated");

    let td = document.createElement("td");
    td.textContent = `${p_data.value}${p_data.unit}`;

    row.appendChild(td);
  }

    function updateCurrentWindSpeed(row, w_data) {
    console.log("Wind Speed not updated");

    let td = document.createElement("td");
    td.textContent = `${w_data.value}${w_data.unit}`;

    row.appendChild(td);
  }

    function updateCurrentCloudCoverage(row, c_data) {
    console.log("Cloud Coverage not updated");

    let td = document.createElement("td");
    td.textContent = `${c_data.value}${c_data.unit}`;

    row.appendChild(td);
  }

    function updateCurrentValueUnit(row, data) {
    // Create TD element
    let td = document.createElement("td");
    // Add Data Value and Unit to the Context
    td.textContent = `${data.value}${data.unit}`;
    // Add TD to the TR
    row.appendChild(td);
    }

    const updateForecast = (model) => {
        console.log("> Updating Forecast");
        // model.dump()

        // Start Table Row
        let row = document.createElement("tr");

        // Update individual View Sections
        let temp = model.temperature;
        updateForecastTemperature(row, temp);

        let wind = model.wind_speed;
        updateForecastWindSpeed(row, wind);

        let perc = model.percipitation;
        updateForecastPercipitation(row, perc);

        let cloud = model.cloud_coverage;
        updateForecastCloudCoverage(cloud)

        // updateForecastValueUnit(row, cloud);

        // End Table Row
        table_body.appendChild(row);
    };

    function updateForecastTemperature(row, t_data) {
        console.log("Temperature is fucked");

        let td = document.createElement("td");
        td.textContent = `${t_data.from} - ${t_data.to} ${t_data.unit}`

        row.appendChild(td);
    }

    function updateForecastPercipitation(row, p_data) {
        console.log("Percipitation not updated");

        let td = document.createElement("td");
        td.textContent = `${p_data.from} - ${p_data.to} ${p_data.unit}`

        row.appendChild(td);
    }

    function updateForecastWindSpeed(row, w_data) {
        console.log("Wind Speed not updated");

        let td = document.createElement("td");
        td.textContent = `${w_data.from} - ${w_data.to} ${w_data.unit} , ${w_data.directions}`

        row.appendChild(td);
    }

    function updateForecastCloudCoverage(row, c_data) {
        console.log("Cloud Coverage not updated");

        let td = document.createElement("td");
        //td.textContent = `${c_data.from} - ${c_data.to} ${c_data.unit}`

        //row.appendChild(td);
    }

  return { listen, prompt, displayError, updateCurrent, updateForecast };
};


