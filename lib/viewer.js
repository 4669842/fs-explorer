var objectAssign = require('object-assign')
var $ = require('bel')
var path = require('path')

var table = require('./table.js')

module.exports = function viewer (selected, opts) {
  console.time('viewer')
  if (!selected) return
  opts = objectAssign({
    className: 'fs-explorer-files'
  }, opts)
  function render () {
    if (selected.type === 'folder') {
      return table(selected.children || [])
    } else {
      return fileViewer()
    }
  }
  function fileViewer () {
    // TODO: Weird bug when clicking directly into files, onclick=file isnt working above
    // TODO: Render each file type
    return $`<div>${selected.data}</div>`
  }
  var element = $`<div className="${opts.className}">
    <h3>${selected.path}</h3>
    ${render()}
  </div>`
  console.timeEnd('viewer')
  return element
}
