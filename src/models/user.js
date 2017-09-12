const dbUser = require('./database/user')

module.exports = {
  readAll: dbUser.readAll,
  create: dbUser.create
}
