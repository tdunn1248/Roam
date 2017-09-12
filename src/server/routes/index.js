const router = require('express').Router()
const users = require('./user')

router.get('/', (request, response) => {
  response.status(200).render('index')
})

router.use('/users', users)

module.exports = router
