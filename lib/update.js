// update() wrapper and likely will become it's own library if useful
var document = require('global/document')
var morphdom = require('morphdom')

module.exports = function update (from, to) {
  if (typeof from === 'string') {
    from = document.querySelector(from)
  }
  // TODO: Queue these and use raf to deal with multiple runs on the same element?
  morphdom(from, to)
}
