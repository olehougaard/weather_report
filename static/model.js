function digest({ data }) {
    const ms_in_day = 24 * 60 * 60 * 1000;
    const now = new Date();
    now.setHours(0,0,0,0)
    const five_days_ago = new Date(now - 5 * ms_in_day)
    const temp = []
    const prec = []
    const wind = []
    const cloud = []

    data.forEach(item => {
        switch(item.type) {
            case 'temperature':
                temp.push(item)
            case 'precipitation':
                prec.push(item)
            case 'wind speed':
                wind.push(item)
            case 'cloud coverage':
                cloud.push(item)
        }
    })

    const find_latest = array => array.reduce((prev, curr) => prev.time > curr.time ? prev : curr)
    const find_smallest = array => array.reduce((prev, curr) => prev.value < curr.value ? prev : curr)
    const find_largest = array => array.reduce((prev, curr) => prev.value > curr.value ? prev : curr)

    const latest_measurements = () => {
        const latest_temp = find_latest(temp)
        const latest_prec = find_latest(prec)
        const latest_wind = find_latest(wind)
        const latest_cloud = find_latest(cloud)
        return [latest_temp, latest_prec, latest_wind, latest_cloud]
    }

    const min_temperature = () => [ find_smallest(temp.filter(item => new Date(item.time) >= five_days_ago)) ]
    const max_temperature = () => [ find_largest(temp.filter(item => new Date(item.time) >= five_days_ago)) ]



    return { latest_measurements, min_temperature, max_temperature }
}