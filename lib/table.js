var objectAssign = require('object-assign')
var $ = require('bel')
var path = require('path')

module.exports = function table (rows, opts) {
  console.time('table')
  var asc = true
  var sortBy = 'path'
  function render (r) {
    return $`<table>
      ${head()}
      ${body(r)}
    </table>`
  }
  function sort (name) {
    asc = (asc) ? false : true
    sortBy = name
    rows = rows.sort(function (a, b) {
      a = a[name]
      b = b[name]
      if (name === 'path') {
        a = path.basename(a)
        b = path.basename(b)
      }
      return (asc) ? a.localeCompare(b) : b.localeCompare(a)
    })
    element.rerender(render(rows))
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
  function body (files) {
    return $`<tbody>
      ${files.map(function (file) {
        var icon = $`<i className="fa fa-${file.type}"></i>`
        return $`<tr>
          <td>
            ${icon}
            <button onclick=${function () {
              console.log(file.path)
              element.send('selected', file)
            }} oncontextmenu=${function (e) {
              e.preventDefault()
              console.log('context')
            }}>${path.basename(file.path)}</button>
          </td>
          <td>
            ${file.mtime}
          </td>
        </tr>`
      })}
    </tbody>`
  }
  var element = render(rows.slice(0))
  console.timeEnd('table')
  return element
}
