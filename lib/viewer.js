var $ = require('bel')
var breadcrumb = require('breadcrumb-element')
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
  var element = $`<div className="fs-explorer-viewer col-md-9">
    <div className="breadcrumb">
      ${breadcrumb(selected.path.slice(1).split('/'), function (trail) {
        var p = '/' + trail.join('/')
        console.log('selected', p)
        // TODO: Determine path then send up onselected
      })}
    </div>
    ${render()}
  </div>`
  console.timeEnd('viewer')
  return element
}
