var test = require('tape')
var explorer = require('./index')
var tree = require('./lib/tree')

test('basically works', function (t) {
  t.plan(1)
  var files = [
    {
      path: 'bears',
      type: 'folder',
      mtime: new Date(),
      children: [
        {
          path: 'bears/grizzly.js',
          type: 'file',
          mtime: new Date()
        }
      ]
    }
  ]
  var element = explorer(files)
  var treeButton = element.querySelector('.' + tree.styles.tree)
  t.ok(treeButton.textContent.indexOf('bears') !== -1, 'tree should display the folder name')
  t.end()
})
