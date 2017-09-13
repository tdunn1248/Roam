const router = require('express').Router()
const users = require('./user')
const cities = require('./city')
const posts = require('./post')

router.get('/', (request, response) => {
  response.status(200).render('index')
})

router.use('/users', users)
router.use('/cities', cities)
router.use('/posts', posts)

module.exports = router
