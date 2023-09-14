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

  const update = (model) => {
    console.log("> Updating Site");
    // model.dump()

    // Start Table Row
    let row = document.createElement("tr");

    // Update individual View Sections
    let temp = model.temperature;
    updateTemperature(row, temp);

    let wind = model.wind_speed;
    updateWindSpeed(row, wind);
    
    let perc = model.percipitation;
    updatePercipitation(row, perc);

    let cloud = model.cloud_coverage;
    // updateCloudCoverage(cloud)

    // updateValueUnit(row, cloud);

    // End Table Row
    table_body.appendChild(row);
  };

  function updateTemperature(row, t_data) {
    console.log("Temperature is fucked");

    let td = document.createElement("td");
    td.textContent = `${t_data.value}${t_data.unit}`;

    row.appendChild(td);
  }

  function updatePercipitation(row, p_data) {
    console.log("Percipitation not updated");

    let td = document.createElement("td");
    td.textContent = `${p_data.value}${p_data.unit}`;

    row.appendChild(td);
  }

  function updateWindSpeed(row, w_data) {
    console.log("Wind Speed not updated");

    let td = document.createElement("td");
    td.textContent = `${w_data.value}${w_data.unit}`;

    row.appendChild(td);
  }

  function updateCloudCoverage(row, c_data) {
    console.log("Cloud Coverage not updated");

    let td = document.createElement("td");
    td.textContent = `${c_data.value}${c_data.unit}`;

    row.appendChild(td);
  }

  function updateValueUnit(row, data) {
    // Create TD element
    let td = document.createElement("td");
    // Add Data Value and Unit to the Context
    td.textContent = `${data.value}${data.unit}`;
    // Add TD to the TR
    row.appendChild(td);
  }

  return { listen, prompt, displayError, update };
};
