# fs-explorer

## Creating a Component

A very simple list can be created like:

```js
// list.js
var $ = require('bel')

module.exports = function (items) {
  return $`<ul>
    ${items.map(function (item) {
      return $`<li>${item}</li>`
    })}
  </ul>`
}
```

Then it can be added to a page with:

```js
// app.js
var list = require('./list.js')
var element = list([
  'grizzly',
  'polar',
  'brown'
])
document.body.appendChild(element)
```
