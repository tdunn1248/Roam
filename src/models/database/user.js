const db = require('./config/config')

const readAll = () => {
  let query = `
    SELECT *
    FROM member
  `
  return db.any(query)
          .catch(error => {
            console.log('from db', error);
          })
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
  create
}
