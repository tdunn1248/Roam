const dbPost = require('./database/post')

module.exports = {
  create: dbPost.create,
  readUserContent: dbPost.getUserPosts
}
