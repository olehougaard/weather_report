const express = require('express')
const body_parser = require('body-parser')
const generator = require('./model/generate.js')
const { alert } = require('./model/model.js')
const { partition, findLast } = require('./util/utils.js')

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
let historic_alerts = { [ start_time.getTime() ]: alerts.slice() }

const update_alerts = (forecast, time) => {
    const match_alerts = alerts.map((alert, idx) => ({ idx, new_prediction: forecast.find(alert.matches)}))
    const { positive: updated_alerts, negative: cancelled_alerts } = partition(t => t.new_prediction && generator.alertable(t.new_prediction))(match_alerts)
    const unalerted = forecast.filter(p => !alerts.some(a => a.matches(p)))

    cancelled_alerts.forEach(({idx}) => alerts[idx] = alerts[idx].cancelled())
    updated_alerts.forEach(({idx, new_prediction}) => alerts[idx] = alerts[idx].updated(new_prediction))
    alerts.push(...create_alerts(unalerted))

    historic_alerts[time.getTime()] = alerts.slice()
}

const regenerate_forecast = () => {
    const time = new Date()
    const new_forecast = generator.regenerate_forecast(forecast)(time)
    update_alerts(new_forecast, time)
    return forecast = new_forecast
}

const warnings = alerts => ({ time: new Date(), warnings: alerts })

app.get('/data', (_, res) => {
    res.send(data)
})

app.get('/data/:place', (req, res) => {
    res.send(data.filter(({place}) => place === req.params.place))
})

app.post('/data', (req, res) => {
    data.push(...req.body)
    res.status(201)
    res.send()
})

app.get('/forecast', (_, res) => {
    res.send(forecast)
})

app.get('/forecast/:place', (req, res) => {
    res.send(forecast.filter(({place}) => place === req.params.place))
})

app.get('/warnings', (_, res) => {
    res.send(warnings(alerts.filter(a => a.prediction)))
})

app.get('/warnings/:id', (req, res) => {
    const alert = alerts.find(({id}) => id == req.params.id)
    if (alert)
        res.send(alert)
    else {
        res.status(404)
        res.send()
    }
})

app.get('/warnings/since/:time', (req, res) => {
    const time = Date.parse(req.params.time)
    if (time) {
        const alert_time = findLast(t => t <= time)(Object.keys(historic_alerts))
        if (alert_time) {
            const old_alerts = historic_alerts[alert_time]
            res.send(warnings(alerts.filter(a => !old_alerts.some(a.equals))))
        } else {
            res.send(warnings(alerts.filter(a => a.prediction)))
        }
    } else {
        res.status(400)
        res.send()
    }
})

const web_service_port = 8080
const update_frequency_seconds = process.argv[2] || 600

function update_periodically() {
    setTimeout(() => {
        regenerate_forecast()
        update_periodically()
    }, update_frequency_seconds * 1000)
}

update_periodically()

app.listen(web_service_port, () => console.log("Server started on", web_service_port, "at", start_time.toString()))
