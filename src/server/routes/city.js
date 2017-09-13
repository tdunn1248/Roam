const router = require('express').Router()
const city = require('../../models/city')

router.get('/:city/:id', (request, response) => {
  city.getAllPosts(request.params.id).then(posts => {
    response.status(200).render('city-single-view', {webpage: '/cities/city/id', user: request.session.id, city: request.params.city, posts: posts})
  })
})

router.get('/', (request, response) => {
  city.getAll(request.params.id).then(cities => {
    response.status(200).render('cities', {user: request.session.id, cities: cities, webpage:'/new-post'})
  })
})

module.exports = router
