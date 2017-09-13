const dbUser = require('./database/user')

module.exports = {
  readAll: dbUser.readAll,
  readAllById: dbUser.readAllById,
  create: dbUser.create
}
