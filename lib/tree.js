var objectAssign = require('object-assign')
var $ = require('bel')
var path = require('path')

// TODO: Store opened/closed state internally and use localstorage

module.exports = function tree (files, opts) {
  console.time('tree')
  opts = objectAssign({
    className: 'fs-explorer-tree'
  }, opts)
  function render () {
    return $`<ul className="${opts.className}">
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
    var button = $`<li>
      ${icon}
      <button className="${file.type}" onclick=${function () {
        if (file.type === 'folder') {
          file.opened = (file.opened) ? false : true
          element.rerender(render)
        }
        button.send('selected', file)
      }}>${path.basename(file.path)}</button>
      ${children}
    </li>`
    return button
  }
  var element = render()
  console.timeEnd('tree')
  return element
}
