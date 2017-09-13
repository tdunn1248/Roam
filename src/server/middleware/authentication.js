module.exports = {
  checkUserSession: function(error, request, response, next) {
    if (request.session === {}) { response.render('login') }
    else { next() }
  }
}
