const db = require('./config/config')

const readAll = (email) => {
  let query = `
    SELECT *
    FROM member
    WHERE email = $1
  `
  return db.any(query, [email])
}

const readAllById = (id) => {
  let query = `
    SELECT *
    FROM member
    WHERE id = $1
  `
  return db.any(query, [id])
}

const create = (email, password) => {
  let query = `
    INSERT INTO member (email, password)
    VALUES ($1, $2)
    RETURNING *
  `
  return db.one(query, [email, password])
          .catch(error => {
            console.log('from db', error);
          })
}

module.exports = {
  readAll,
  readAllById,
  create
}
