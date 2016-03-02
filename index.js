var $ = require('bel')
var viewer = require('./lib/viewer')
var tree = require('./lib/tree')

module.exports = function explorer (files) {
  console.time('explorer')
  function render (selected) {
    return $`<div className="fs-explorer row">
      ${tree(files, onselected)}
      ${viewer(selected, onselected)}
    </div>`
  }
  function onselected (file) {
    element.update(render(file))
  }
  var element = render(files[0])
  console.timeEnd('explorer')
  return element
}
