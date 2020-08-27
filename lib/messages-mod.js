const pool = require('./db');

// ****************************************************************
// INSERT queries for messages
// ****************************************************************


const addMessage = function(messageObj) {

  const values = [];
  let queryString = 'INSERT INTO messages (';

  for (let key in messageObj) {
    queryString += `${key}, `;
    values.push(`${messageObj[key]}`);
  }

  queryString = queryString.slice(0, -2);
  queryString += `) VALUES (`;

  for (let value of values) {
    const num = values.indexOf(value) + 1;
    if (num === values.length) {
      queryString += `$${num}`;
    } else {
      queryString += `$${num}, `;
    }
  }

  queryString += ') RETURNING *, id as messages_id;';

  return pool.query(queryString, values)
    .then(res => {
      console.log(res.rows[0]);
      return res.rows[0];
    });

}

module.exports = {
  addMessage
}

