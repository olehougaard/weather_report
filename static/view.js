function view(city, model) {
    const {div, h2, h3, p, table, tbody, thead, tr, td} = React.DOM;
    
    function display_weather_data(data) {
        return table(null, 
            thead(null, null, tr(null, null, td(null, "Type"), td(null, "Value"), td(null, "Unit"), td(null, "Time"))),
            tbody(null, null, ...data.map(d => {
                return tr(null, null, 
                    td(null, null, d.type),
                    td(null, null, d.value),
                    td(null, null, d.unit),
                    td(null, null, new Date(d.time).toDateString())
                    )
                })
            )
        )
    }    

    function display_temperature(data) {
        return `${data.value} ${data.unit} on ${new Date(data.time).toDateString()}`
    }

    function display_value(data) {
        return `${data[0]} ${data[1]}`
    }

    function display_forecast(forecast) {
        return table(null, 
            thead(null, null, tr(null, null, td(null, "Time"), td(null, "Type"), td(null, "From"), td(null, "To"), td(null, "Unit"))),
            tbody(null, null, ...forecast.map(f => {
                return tr(null, null, 
                    td(null, null, new Date(f.time).toDateString() + ' ' + new Date(f.time).getHours() + ':00:00'),
                    td(null, null, f.type),
                    td(null, null, f.from),
                    td(null, null, f.to),
                    td(null, null, f.unit)
                    )
                })
            )
        )
    }

    return div(null, 
        h2(null, `Weather Report for ${city}`),
        h3(null, 'Latest measurements'), 
        display_weather_data(model.latest_measurements()),
        h3(null, 'Last 5 days statistics'), 
        p(null, 'Minimum temperature: ' + display_temperature(model.min_temperature())),
        p(null, 'Maximum temperature: ' + display_temperature(model.max_temperature())),
        p(null, 'Total precipitation: ' + display_value(model.total_precipitation())),
        p(null, 'Average wind speed: ' + display_value(model.average_wind_speed())),
        p(null, 'Dominant wind direction: ' + model.dominant_direction()),
        p(null, 'Average cloud coverage: ' + display_value(model.average_cloud_coverage())),
        h3(null, 'Hourly predictions for the next 24 hours'), 
        display_forecast(model.hourly_predictions())
    )
}

function update(parent) {
    return view => ReactDOM.render(view, parent)
}