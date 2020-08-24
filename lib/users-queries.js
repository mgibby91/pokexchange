const pool = require('./db');

const getUserByID = function(userID) {

  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1;
  `, [userID])
    .then(res => {
      if (!res.rows.length) {
        return null;
      }
      console.log(res.rows);
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    });

}

const getUserByUsername = function(username) {

  return pool.query(`
  SELECT *
  FROM users
  WHERE username = $1;
  `, [username])
    .then(res => {
      if (!res.rows.length) {
        return null;
      }
      console.log(res.rows);
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    });

}

module.exports = {
  getUserByID,
  getUserByUsername,
}
