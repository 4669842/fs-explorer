var explorer = require('./index.js')
var $ = require('bel')
var createRouter = require('base-router')
var nets = require('nets')

var router = createRouter({
  '/': function (params, done) {
    nets({
      url: 'example/exampleTree.json',
      json: true
    }, function (err, res, files) {
      done(err, files)
    })
  }
})

router.on('transition', function (router, data) {
  app.rerender(explorer(data))
})
router.transitionTo('/')

var app = $`<div className="app">
  <i className="fa fa-spinner fa-spin"></i> Loading files....
</div>`
document.body.appendChild(app)


// With Dat
// var Dat = require('dat-browserify')
// var db = Dat()
//
// var datURI = '6ce5983b1a2ea0f961337a2959964d105b04bceb85f3577d333a0c86547ca98d'
// var swarm = db.joinWebrtcSwarm(datURI)
//
// var archive = db.drive.get(datURI, '.')
// var entries = []
// var entryStream = archive.createEntryStream()
// entryStream.on('data', function (entry) {
//   console.log('got entry', entry)
// })
