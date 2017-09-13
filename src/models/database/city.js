const db = require('./config/config')

const getAllPosts = (id) => {
  let query = `
    SELECT DISTINCT post.content, member.email
    FROM post
    JOIN city
    ON post.city_id = $1
    JOIN member
    ON post.member_id = member.id
  `
  return db.any(query, [id])
}

const getAll = () => {
  let query = `
    SELECT *
    FROM city
  `
  return db.any(query)
}

module.exports = {
  getAllPosts,
  getAll
}
