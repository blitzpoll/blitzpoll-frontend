var levelup = require('levelup')
var db = levelup('/tmp/dprk.db', { valueEncoding: 'json' })

db.put(
    'dprk'
  , {
        name       : 'Kim Jong-un'
      , spouse     : 'Ri Sol-ju'
      , dob        : '8 January 1983'
      , occupation : 'Clown'
    }
  , function (err) {
      db.get('dprk', function (err, value) {
        console.log('dprk:', value)
      })
    }
)

db.put(
    'dprk'
  , {
        name       : 'Kim Jong-Foo'
      , spouse     : 'Ri Sol-ju'
      , dob        : '8 January 1983'
      , occupation : 'Clown'
    }
  , function (err) {
      db.get('dprk', function (err, value) {
        console.log('dprk:', value)
      })
    }
)

db.get('dprk', function (err, value) {
        console.log('dprk:', value)
        db.close()
})
