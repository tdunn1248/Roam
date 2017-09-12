const router = require('express').Router()
const user = require('../../models/user')

router.route('/login')
      .get((request, response) => {response.status(200).render('login')})
      .post((request, response) => {
      })

router.route('/signup')
      .get((request, response) => {
        response.status(200).render('signup')
      })
      .post((request, response, next) => {
      user.create(request.body.email, request.body.password)
        .then(newUser => {
            request.session.id = newUser.id
            request.session.name = newUser.name
            response.status(200).render('profile', {name: newUser.email})
        })
        .catch(error => next(error))
      })

router.get('/profile', (request, response) => {
    response.status(200).render('profile')
})

router.get('/signout', (request, response) => {
    request.session = null
    response.status(200).render('login')
})

router.use((error, request, response, next) => {
  console.log('whoopsie', error);
})

module.exports = router
