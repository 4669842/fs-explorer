var path = require('path')
var $ = require('bel')

module.exports = function table (files, onselected) {
  console.time('table')
  var asc = true
  var sortBy = 'path'
  function render (files) {
    return $`<table>
      ${head()}
      ${body(files)}
    </table>`
  }
  function sort (name) {
    asc = !asc
    sortBy = name
    files = files.sort(function (a, b) {
      a = a[name]
      b = b[name]
      if (name === 'path') {
        a = path.basename(a)
        b = path.basename(b)
      }
      return (asc) ? a.localeCompare(b) : b.localeCompare(a)
    })
    element.update(render(files))
  }
  function th (key, label) {
    var icon = ''
    if (sortBy === key) {
      icon = (asc) ? $`<i className="fa fa-caret-down"></i>` : $`<i className="fa fa-caret-up"></i>`
    }
    return $`<th>
      <button onclick=${function () {
        sort(key)
      }}>${label}</button>
      ${icon}
    </th>`
  }
  function head () {
    return $`<thead>
      <tr>
        ${th('path', 'Name')}
        ${th('mtime', 'Modified')}
      </tr>
    </thead>`
  }
  function body () {
    return $`<tbody>
      ${files.map(function (file) {
        var icon = $`<i className="fa fa-${file.type}"></i>`
        return $`<tr>
          <td>
            ${icon}
            <button onclick=${function () {
              onselected(file)
            }}>${path.basename(file.path)}</button>
          </td>
          <td>
            ${file.mtime}
          </td>
        </tr>`
      })}
    </tbody>`
  }
  var element = render(files)
  console.timeEnd('table')
  return element
}
