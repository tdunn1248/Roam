const router = require('express').Router()
const post = require('../../models/post')
const city = require('../../models/city')

router.get('/', (request,response) => {
  city.getAll().then(cities => {
    response.render('new-post', {cities: cities, webpage: '/new-post', user: request.session.id})
  })
})

router.post('/', (request,response) => {
  post.create(request.body.content, request.body.city, request.session.id)
    .then((yeaaa) => {
      response.redirect('users/profile/' + request.session.id)
    })
})

module.exports = router
