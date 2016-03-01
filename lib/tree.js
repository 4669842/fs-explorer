var path = require('path')
var $ = require('bel')

// TODO: Store opened/closed state internally and use localstorage

module.exports = function tree (files, onselected) {
  console.time('tree')
  function render () {
    return $`<ul className="fs-explorer-tree">
      ${files.map(function (file) {
        return li(file)
      })}
    </ul>`
  }
  function li (file) {
    var children = ''
    var icon = $`<i className="fa"></i>`
    if (file.type === 'folder') {
      if (file.opened) {
        children = $`<ul>${file.children.map(function (child) {
          return li(child)
        })}</ul>`
        icon.className += ' fa-folder-open'
      } else {
        icon.className += ' fa-folder'
      }
    } else {
      icon.className += ' fa-file'
    }
    var children = (file.opened) ? $`<ul>${file.children.map(function (child) {
      return li(child)
    })}</ul>` : ''
    return $`<li>
      ${icon}
      <button className="${file.type}" onclick=${function () {
        if (file.type === 'folder') {
          file.opened = (file.opened) ? false : true
          element.update(render())
        }
        onselected(file)
      }}>${path.basename(file.path)}</button>
      ${children}
    </li>`
  }
  var element = render()
  console.timeEnd('tree')
  return element
}
