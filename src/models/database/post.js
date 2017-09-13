const db = require('./config/config')


const getUserPosts = (id) => {
  let query = `
    SELECT DISTINCT post.id, post.content, post.created, post.city_id, city.name
    FROM post
    JOIN city
    ON post.city_id = city.id
    WHERE post.member_id = $1
  `
  return db.any(query, [id])
}

const create = (content, city_id, member_id) => {
  let query = `
    INSERT INTO post (content, city_id, member_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `
  return db.one(query, [content, city_id, member_id])
}

module.exports = {
  getUserPosts,
  create
}
