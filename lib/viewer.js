var $ = require('bel')
var table = require('./table.js')

module.exports = function viewer (selected, onselected) {
  console.time('viewer')
  if (!selected) return
  function render () {
    if (selected.type === 'folder') {
      return table(selected.children || [], onselected)
    } else {
      return fileViewer()
    }
  }
  function fileViewer () {
    return $`<div>${selected.data}</div>`
  }
  var element = $`<div className="fs-explorer-files">
    <h3>${selected.path}</h3>
    ${render()}
  </div>`
  console.timeEnd('viewer')
  return element
}
