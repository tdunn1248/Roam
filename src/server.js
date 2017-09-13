const express = require('express')
const app = express()
const pug = require('pug')
const bodyParser = require('body-parser')
const routes = require('./server/routes')
const cookieSession = require('cookie-session')

// sign members up and login
// reset DB and create dummy data with new-post form for a city
//

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 60000000
}))

app.use((request, response, next) => {
  response.locals.query = ''
  response.locals.error = ''
  response.locals.cities = null
  next()
})

app.use(routes)

const port = 3001
app.listen(port, () => console.log(`running on ${port}`))
