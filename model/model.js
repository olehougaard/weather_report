const data_type = (type, unit) => properties => Object.assign({}, properties, {type, unit})

const event = (time, place) => properties => Object.assign({}, properties, {time, place})

const measurement = data_type => (object, event) => Object.assign(Object.create({event: () => event}), event(data_type(object)))

const temperature_measurement = measurement(data_type('Temperature', 'C'))
const precipitation_measurement = measurement(data_type('Precipitation', 'mm'))
const wind_measurement = measurement(data_type('Wind', 'm/s'))
const cloud_measurement = measurement(data_type('Cloud Coverage', '%'))

const temperature = (value, event) => temperature_measurement({value}, event)
const temperature_prediction = ({from, to}, event) => temperature_measurement({from, to}, event)

const wind = (value, direction, event) => wind_measurement({value, direction}, event)
const wind_prediction = ({from, to}, directions, event) => wind_measurement({from, to, directions}, event)

const precipitation = (value, precipitation_type, event) => precipitation_measurement({value, precipitation_type}, event)
const precipitation_prediction = ({from, to}, precipitation_type, event) => precipitation_measurement({from, to, precipitation_type}, event)

const cloud = (value, event) => cloud_measurement({value}, event)
const cloud_prediction = ({from, to}, event) => cloud_measurement({from, to}, event)

module.exports = {event, temperature, temperature_prediction, wind, wind_prediction, precipitation, precipitation_prediction, cloud, cloud_prediction}
