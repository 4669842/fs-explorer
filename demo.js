var $ = require('bel')

var data = 'foo'
var element = render(data)
document.body.appendChild(element)

// ... later ...

data = 'changed'
element.update(render(data))

// Will do DOM diffing to update


function render (data) {
  return $`<div>${data}</div>`
}
