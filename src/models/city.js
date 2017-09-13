const dbCity = require('./database/city')

module.exports = {
  getAllPosts: dbCity.getAllPosts,
  getAll: dbCity.getAll
}
