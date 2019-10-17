function digest({ data }) {
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

    const latest_measurements = () => {
        const latest_temp = find_latest(temp)
        const latest_prec = find_latest(prec)
        const latest_wind = find_latest(wind)
        const latest_cloud = find_latest(cloud)
        return [latest_temp, latest_prec, latest_wind, latest_cloud]
    }

    return { latest_measurements }
}