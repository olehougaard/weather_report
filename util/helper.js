const print = value => value ? `${value}: ` : ''

const round = value => Math.round(value * 100) / 100

const isFahrenheit = unit => unit.toUpperCase() === 'F'

const isCelsius = unit => unit.toUpperCase() === 'C'

const convertValueToF = value => round((value * 9) / 5 + 32)

const convertValueToC = value => round((value - 32) * 5 / 9)

const isInches = unit => unit.toUpperCase() === 'INCH' || unit.toUpperCase() === 'INCHES'

const isMM = unit => unit.toUpperCase() === 'MM'

const convertValueToInches = value => round(value / 25.4)

const convertValueToMM = value => round(value * 25.4)

const isMPH = unit => unit.toUpperCase() === 'MPH'

const isMS = unit => unit.toUpperCase() === 'MS'

const convertValueToMPH = value => round(value * 2.236936)

const convertValueToMS = value => round(value * 0.44704)

module.exports = { print, round, isFahrenheit, isCelsius, convertValueToF, convertValueToC, isInches,
isMM, convertValueToInches, convertValueToMM, isMPH, isMS, convertValueToMPH, convertValueToMS }