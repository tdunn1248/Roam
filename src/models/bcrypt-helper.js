const bcrypt = require('bcrypt')

module.exports = {
  hashPassword: function hashPassword(password) {
    return bcrypt.hash(password, 10)
  },
  comparePasswords: function compare(plainpassword, hashed) {
    return bcrypt.compare(plainpassword, hashed)
  }
}
