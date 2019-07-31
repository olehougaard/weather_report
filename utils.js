const flatten = xs => [].concat(...xs)
const flatMap = f => xs => flatten(xs.map(f))
const range = n => [...Array(n).keys()]

const pipe = (...fs) => x => fs.reduce((arg, f) => f(arg), x)
module.exports = {flatten, flatMap, range, pipe}