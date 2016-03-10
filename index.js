var bel = require('bel')
var csjs = require('csjs')
var update = require('./lib/update')
var viewer = require('./lib/viewer')
var tree = require('./lib/tree')

module.exports = function explorer (files) {
  console.time('explorer')
  function render (selected) {
    return bel`<div class="${className}">
      ${tree(files, onselected)}
      ${viewer(selected, onselected)}
    </div>`
  }
  function onselected (file) {
    update('.' + className, render(file))
  }
  var element = render(files[0])
  console.timeEnd('explorer')
  return element
}

var styles = module.exports.styles = csjs`
.fs-explorer {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}
`
var className = styles['fs-explorer']
