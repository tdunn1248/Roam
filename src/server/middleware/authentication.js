module.exports = function(request, response, next) {
    if (!request.session.id) { response.render('login') }
    else { next() }
  }
