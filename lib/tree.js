var path = require('path')
var bel = require('bel')
var csjs = require('csjs')
var contextmenu = require('./contextmenu.js')

// TODO: Store opened/closed state internally and use localstorage

module.exports = function tree (files, onselected) {
  console.time('tree')
  var shownMenu = false
  var element = render()
  console.timeEnd('tree')
  return element

  function render () {
    return bel`<div class=${styles.index}>
      <ul>
        ${files.map(function (file) {
          return li(file)
        })}
      </ul>
      ${shownMenu ? contextmenu(shownMenu, menuAction) : ''}
    </div>`
  }

  function li (file) {
    var children = ''
    var icon = ''
    if (file.type === 'folder') {
      if (file.opened) {
        children = bel`<ul>${file.children.map(function (child) {
          return li(child)
        })}</ul>`
        icon = 'fa-folder-open'
      } else {
        icon = 'fa-folder'
      }
    } else {
      icon = 'fa-file'
    }
    icon = bel`<i className="fa ${icon}"></i>`
    var el = bel`<li>
      ${icon}
      <button className="${file.type}" onclick=${function () {
        if (file.type === 'folder') {
          file.opened = !file.opened
          //el.update(render())
          document.querySelector('.' + styles.index).update(render())
        }
        onselected(file)
      }} oncontextmenu=${function (e) {
        e.preventDefault()
        showMenu(e.target, file)
      }}>${path.basename(file.path)}</button>
      ${children}
    </li>`
    return el
  }

  function menuAction (action) {
    switch (action) {
      case 'hide':
        hideMenu()
        break
      default:
        console.log(action)
        hideMenu()
        break
    }
  }

  function showMenu (target, file) {
    shownMenu = {
      target: target,
      file: file
    }
    element.update(render())
  }

  function hideMenu () {
    shownMenu = false
    element.update(render())
  }
}

var styles = module.exports.styles = csjs`
.index {
  background-color: #F5F5F5;
}
.index ul {
  border-right: 1px solid #ddd;
}
.index li {
  list-style: none;
  clear: both;
}
.index li ul {
  padding-left: 1em;
}
.index i {
  float: left;
  padding: .3em 0;
  color: #35b44f;
}
.index button {
  background: transparent;
  border: none;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
}
.index button.folder {
  font-weight: bold;
}
.index button:focus {
  outline: none;
}
`
