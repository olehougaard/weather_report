function view(model) {
    const {div, h2, table, tbody, thead, tr, td} = React.DOM;
    
    function show_latest_measurements(measurements) {
        return table(null, 
            thead(null, null, tr(null, null, td(null, "Type"), td(null, "Value"), td(null, "Unit"), td(null, "Place"), td(null, "Time"))),
            tbody(null, null, ...measurements.map(m => {
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
        show_latest_measurements(model.latest_measurements())
    )
}

function update(parent) {
    return view => ReactDOM.render(view, parent)
}