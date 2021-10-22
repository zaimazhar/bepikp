const queue = require('queue')
var q = queue({ results: [] })

function start() {
  q.start(err => {
    if(err) throw err
    console.log("Done: ", q.results)
  })
}

function add(fn) {
  q.push(fn)
}

module.exports = {
  start,
  add
}