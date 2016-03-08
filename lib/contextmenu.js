var bel = require('bel')
var csjs = require('csjs')
var onload = require('on-load')()

module.exports = function menu (shownMenu, action) {
  var element = render()
  onload(element, function () {
    document.addEventListener('mousedown', onHide)
    document.addEventListener('touchstart', onHide)
  }, function () {
    document.removeEventListener('mousedown', onHide)
    document.removeEventListener('touchstart', onHide)
  })
  return element

  function render () {
    var items = [
      downloadButton(shownMenu.file),
      deleteButton(shownMenu.file)
    ]
    var rect = shownMenu.target.getBoundingClientRect()
    var style = {
      position: 'absolute',
      top: rect.top + rect.height,
      left: rect.left
    }
    return bel`<ul class=${styles.index} style=${style}>
      ${items.map(function (item) {
        return bel`<li>${item}</li>`
      })}
    </ul>`
  }

  function downloadButton (file) {
    return bel`<button onclick=${function () {
      action('download', file)
    }}>Download</button>`
  }

  function deleteButton (file) {
    return bel`<button onclick=${function () {
      action('delete', file)
    }}>Delete</button>`
  }

  function onHide (e) {
    var source = e.target
    while (source.parentNode) {
      if (source === element) {
        return true
      }
      source = source.parentNode
    }
    action('hide')
  }
}

var styles = module.exports.styles = csjs`
.index {
  box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.2);
  position: absolute;
  background-color: #FAFAFA;
  padding: 0;
  margin: 0;
  font-size: .8rem;
}
.index button {
  padding: .5rem 1rem;
  width: 100%;
}
.index button:hover {
  background-color: #F5F5F5;
}
`
