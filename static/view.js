export default window => {
    const document = window.document
    const table_body = document.getElementById('weather_data')
    const listeners = []

    const listen = l => listeners.push(l)

    const displayError = e => {
        const msg_board = document.getElementById('error_messages')
        msg_board.innerText = e
    }

    const prompt = window.prompt.bind(window)

    const update = (model) => {
        console.log('> Updating Site')
        // model.dump()
        
        // Update individual View Sections
        let temp = model.temperature
        updateTemperature(temp)

        let perc = model.percipitation
        updatePercipitation(perc)

        let wind = model.wind_speed
        updateWindSpeed(wind)

        let cloud = model.cloud_coverage
        updateCloudCoverage(cloud)        
    }

    function updateTemperature(t_data){
        console.log('Temperature not updated')
    }

    function updatePercipitation(p_data){
        console.log('Percipitation not updated')
    }

    function updateWindSpeed(w_data){
        console.log('Wind Speed not updated')
    }

    function updateCloudCoverage(c_data){
        console.log('Cloud Coverage not updated')
    }

    return { listen, prompt, displayError, update }
}