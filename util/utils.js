const flatten = xs => [].concat(...xs)
const flatMap = f => xs => flatten(xs.map(f))
const findIndeces = p => xs => xs.map((x, i) => [x, i]).filter(([x]) => p(x)).map(([_, i]) => i)
const partition = p => xs => {
    const positive = []
    const negative = []
    xs.forEach(x => {
        if (p(x))
            positive.push(x)
        else
            negative.push(x)
    })
    return { positive, negative }
}
const range = n => [...Array(n).keys()]

const pipe = (...fs) => x => fs.reduce((arg, f) => f(arg), x)
module.exports = {flatten, flatMap, range, pipe, findIndeces, partition}