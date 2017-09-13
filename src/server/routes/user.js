const router = require('express').Router()
const user = require('../../models/user')
const {hashPassword, comparePasswords} = require('../../models/bcrypt-helper')
const {checkUserSession} = require('../middleware/authentication')
const {readUserContent} = require('../../models/post')

router.use(checkUserSession)

router.route('/login')
      .get((request, response) => {response.status(200).render('login')})
      .post((request, response) => {
        user.readAll(request.body.username)
        .then(user => {
          comparePasswords(request.body.password, user[0].password)
          .then(isValid => {
            if(!isValid) return response.render('login', {error: 'Incorrect Password'})
            request.session.id = user[0].id
            request.session.name = user[0].email
          readUserContent(user[0].id)
          .then(userContent => {
            response.status(200).render('profile', {
              user: user[0].email,
              dateJoined: user[0].joined,
              posts: userContent
            })
          })
        })
      })
    })

router.route('/signup')
      .get((request, response) => {
        response.status(200).render('signup')
      })
      .post((request, response, next) => {
        if (request.body.password !== request.body.confirmPassword) {
          return response.status(200).render('signup', {error: 'Passwords do not match'})
        }
        hashPassword(request.body.password)
          .then(hashedPassword => {
            user.create(request.body.email, hashedPassword)
              .then(newUser => {
                request.session.id = newUser.id
                request.session.name = newUser.email
                response.status(200).render('profile', {
                  user: newUser.email,
                  dateJoined: newUser.joined,
                  posts: []
                })
              })
              .catch(error => next(error))
          })
      })

router.get('/profile/:id', (request, response) => {
  console.log('buddy', request.session);
  user.readAllById(request.params.id).then(userInfo => {
    readUserContent(request.params.id)
      .then(userContent => {
        response.status(200).render('profile', {
          user: userInfo[0].email,
          dateJoined: userInfo[0].joined,
          posts: userContent,
          webpage: '/profile'
        })
      })
    })
})

router.post('/profile/:id', checkUserSession, (request, response) => {
    response.status(200).render('profile')
})

router.get('/signout', (request, response) => {
    request.session = null
    response.status(200).render('login')
})

router.use((error, request, response, next) => {
  if (error.code == 23505) {
    response.render('signup', {error: 'Username is already in use'})
  }
})

module.exports = router
