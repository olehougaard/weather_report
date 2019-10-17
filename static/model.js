function digest({ data, forecast }) {
    const ms_in_day = 24 * 60 * 60 * 1000
    const now = new Date()
    const five_days_ago = new Date(now.setHours(0,0,0,0) - 5 * ms_in_day)
    const temp = []
    const prec = []
    const wind = []
    const cloud = []

    data.forEach(item => {
        switch(item.type) {
            case 'temperature':
                temp.push(item)
                break
            case 'precipitation':
                prec.push(item)
                break
            case 'wind speed':
                wind.push(item)
                break
            case 'cloud coverage':
                cloud.push(item)
                break
        }
    })

    const find_latest = array => array.reduce((prev, curr) => prev.time > curr.time ? prev : curr)
    const find_smallest = array => array.reduce((prev, curr) => prev.value < curr.value ? prev : curr)
    const find_largest = array => array.reduce((prev, curr) => prev.value > curr.value ? prev : curr)
    const last_five_days = array => array.filter(item => new Date(item.time) >= five_days_ago)
    const sum = array => array.reduce((acc, curr) => acc += curr.value, 0)
    const round = value => Math.round(value * 100) / 100

    const latest_measurements = () => {
        const latest_temp = find_latest(temp)
        const latest_prec = find_latest(prec)
        const latest_wind = find_latest(wind)
        const latest_cloud = find_latest(cloud)
        return [latest_temp, latest_prec, latest_wind, latest_cloud]
    }

    const min_temperature = () => find_smallest(last_five_days(temp))
    const max_temperature = () => find_largest(last_five_days(temp))
    const total_precipitation = () => [ round(sum(last_five_days(prec))), prec[0].unit ]
    const average_wind_speed = () => [ round( sum(last_five_days(wind)) / last_five_days(wind).length ), wind[0].unit ]
    
    const dominant_direction = () => {
        const directions = wind.reduce((acc, item) => ({...acc, [item.direction]: acc[item.direction] + 1}),
        {North: 0, Northeast: 0, East: 0, Southeast: 0, South: 0, Southwest: 0, West: 0, Northwest: 0})
        const largest = Object.values(directions).reduce((prev, curr) => prev > curr ? prev : curr)
        return Object.keys(directions).find(key => directions[key] === largest)
    }
    
    const average_cloud_coverage = () => [ round( sum(last_five_days(cloud)) / last_five_days(cloud).length ), cloud[0].unit ]
    const hourly_predictions = () => forecast

    return { latest_measurements, min_temperature, max_temperature, total_precipitation, average_wind_speed, dominant_direction, 
        average_cloud_coverage, hourly_predictions }
}