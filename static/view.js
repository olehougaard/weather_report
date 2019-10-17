function view(model) {
    const {div, h2, table, tbody, thead, tr, td} = React.DOM;
    
    function display_weather_data(data) {
        return table(null, 
            thead(null, null, tr(null, null, td(null, "Type"), td(null, "Value"), td(null, "Unit"), td(null, "Place"), td(null, "Time"))),
            tbody(null, null, ...data.map(m => {
                return tr(null, null, 
                    td(null, null, m.type),
                    td(null, null, m.value),
                    td(null, null, m.unit),
                    td(null, null, m.place),
                    td(null, null, new Date(m.time).toDateString())
                    )
                })
            )
        )
    }    

    return div(null, 
        h2(null, 'Latest measurements'), 
        display_weather_data(model.latest_measurements()),
        h2(null, 'Minimum temperature for the last 5 days'),
        display_weather_data(model.min_temperature()),
        h2(null, 'Maximum temperature for the last 5 days'),
        display_weather_data(model.max_temperature())
    )
}

function update(parent) {
    return view => ReactDOM.render(view, parent)
}