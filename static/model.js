export default model => {
    let temperature = model.temperature
    let percipitation = model.percipitation
    let wind_speed = model.wind
    let cloud_coverage = model.cloud

    return {
        temperature,
        percipitation,
        wind_speed,
        cloud_coverage,
        dump
    }
}


function dump() {
    // Using [this.] to ensure the data is the correct data in the object
    console.log(` ! MODEL DATA DUMP !\n\t${this.temperature}, ${this.percipitation}, ${this.wind_speed}, ${this.cloud_coverage}`)
}