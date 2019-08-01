const flatten = xs => [].concat(...xs)
const flatMap = f => xs => flatten(xs.map(f))
const findIndeces = p => xs => xs.map((x, i) => [x, i]).filter(([x]) => p(x)).map(([_, i]) => i)
const range = n => [...Array(n).keys()]

const pipe = (...fs) => x => fs.reduce((arg, f) => f(arg), x)
module.exports = {flatten, flatMap, range, pipe, findIndeces}