var path = require('path')
var $ = require('bel')

// TODO: Store opened/closed state internally and use localstorage

module.exports = function tree (files, onselected) {
  console.time('tree')
  function render () {
    return $`<ul className="fs-explorer-tree col-md-3">
      ${files.map(function (file) {
        return li(file)
      })}
    </ul>`
  }
  function li (file) {
    var children = ''
    var icon = ''
    if (file.type === 'folder') {
      if (file.opened) {
        children = $`<ul>${file.children.map(function (child) {
          return li(child)
        })}</ul>`
        icon = 'fa-folder-open'
      } else {
        icon = 'fa-folder'
      }
    } else {
      icon = 'fa-file'
    }
    icon = $`<i className="fa ${icon}"></i>`
    var el = $`<li>
      ${icon}
      <button className="${file.type}" onclick=${function () {
        if (file.type === 'folder') {
          file.opened = !file.opened
          el.update(render())
        }
        onselected(file)
      }}>${path.basename(file.path)}</button>
      ${children}
    </li>`
    return el
  }
  var element = render()
  console.timeEnd('tree')
  return element
}
