const express = require('express')
const body_parser = require('body-parser')
const generator = require('./model/generate.js')
const { alert } = require('./model/model.js')
const { findIndeces } = require('./util/utils.js')

const app = express()
app.use(body_parser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
    next();
});

let alert_id = 1
const create_alerts = predictions => {
    const alerts = predictions.filter(generator.alertable).map((prediction, i) => alert(alert_id + i, 3, prediction))
    alert_id += alerts.length
    return alerts
}
  
const start_time = new Date()
const data = generator.generate_historic_data(start_time)
let forecast = generator.generate_forecast(start_time)
const alerts = create_alerts(forecast)
let historic_alerts = { [ start_time.getTime() ]: alerts }

const update_alerts = (forecast, time) => {
    const cancelled_alert_idxs = findIndeces(a => !forecast.any(a.matches))(alerts)
    const updated_alerts = alerts
        .map((alert, idx) => ({ idx, new_prediction: forecast.find(alert.matches)}))
        .filter(t => t.new_prediction)
    const unalerted = forecast.filter(p => !alerts.any(a => a.matches(p)))

    cancelled_alert_idxs.forEach(idx => alerts[idx] = alerts[idx].cancelled())
    updated_alerts.forEach(({idx, new_prediction}) => alerts[idx] = alerts[idx].updated(new_prediction))
    alerts.push(...create_alerts(unalerted))

    historic_alerts[time.getTime()] = alerts
}

const regenerate_forecast = () => {
    const time = new Date()
    const new_forecast = generator.regenerate_forecast(forecast)(time)
    update_alerts(new_forecast, time)
    return forecast = new_forecast
}

app.get('/data', (_, res) => {
    res.send(data)
})

app.get('/data/:place', (req, res) => {
    res.send(data.filter(({place}) => place === req.params.place))
})

const web_service_port = 8080

app.listen(web_service_port, () => console.log("Server started on", web_service_port, "at", start_time.toString()))
