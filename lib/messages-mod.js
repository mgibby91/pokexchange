const pool = require('./db');

// ****************************************************************
// INSERT queries for messages
// ****************************************************************


const addMessage = function(messageObj) {
  console.log("addingmessage:")
  const values = [];
  let queryString = 'INSERT INTO messages (';
  for (let key in messageObj) {
    queryString += `${key}, `;
    values.push(`${messageObj[key]}`);
  }
  queryString = queryString.slice(0, -2);
  queryString += `) VALUES (`;
  for (let i = 1; i <= values.length; i++) {
    if (i === values.length) {
      queryString += `$${i}`;
    } else {
      queryString += `$${i}, `;
    }
  }
  queryString += ') RETURNING *, id as messages_id;';
  return pool.query(queryString, values)
    .then(res => {
      return res.rows[0];
    });
};


module.exports = {
  addMessage
}

