# fs-explorer

A WIP file system explorer element.

![example](https://raw.githubusercontent.com/shama/fs-explorer/master/example/example.gif)


## Installing/Running

```shell
git clone git://github.com/shama/fs-explorer && cd fs-explorer
npm i
npm start
```

Visit `http://localhost:9966`

## Example

The example currently loads `example/example-fs-tree.json` as a mock file system
but will hopefully be connected to [dat](https://github.com/maxogden/dat) soon.

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
