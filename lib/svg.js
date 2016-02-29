var $ = require('bel')

module.exports = function svg (r) {
  return $`<svg viewBox="0 0 100 100">
    <circle cx="60" cy="60" r="${r}"></circle>
  </svg>`
}
