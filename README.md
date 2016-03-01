# fs-explorer [![Build Status](http://img.shields.io/travis/shama/fs-explorer.svg)](https://travis-ci.org/shama/fs-explorer)

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

[https://shama.github.io/fs-explorer](https://shama.github.io/fs-explorer)

## Usage

```js
var explorer = require('fs-explorer')

// Build a file tree
var files = [
  {
    path: 'bears',
    type: 'folder',
    mtime: new Date(),
    children: [
      {
        path: 'bears/grizzly.js',
        type: 'file',
        mtime: new Date(),
      }
    ]
  }
]

// Render the element and append to page
var element = explorer(files)
document.body.appendChild(element)
```
