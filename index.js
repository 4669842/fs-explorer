var objectAssign = require('object-assign')
var $ = require('bel')

var viewer = require('./lib/viewer')
var tree = require('./lib/tree')
var svg = require('./lib/svg')

module.exports = function explorer (files, opts) {
  console.time('explorer')
  opts = objectAssign({
    className: 'fs-explorer'
  }, opts)
  function render (selected) {
    return $`<div className="${opts.className}">
      ${tree(files)}
      ${viewer(selected)}
    </div>`
  }
  var element = render(files[0])
  element.addEventListener('selected', function (e) {
    console.log('selected got', e.detail.path)
    element.rerender(render(e.detail))
  }, false)
  console.timeEnd('explorer')
  return element
}
