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

// Marisa
// const addMessage = function(message) {
//   const values = [];
//   let queryString = 'INSERT INTO messages (';

//   for (const key in message) {
//     queryString += `${key}, `;
//     values.push(`${message[key]}`);
//   }
//   console.log('length: ', values.length);
//   queryString = queryString.slice(0, -2);
//   queryString += ') VALUES (';

//   let num = 1;
//   for (const value of values) {
//       console.log('**************\nnum: ', num, '\n********');
//       queryString += `$${num}, `;
//       num++;
//     }

//     queryString = queryString.slice(0, -2);
//   queryString += ') RETURNING *;';

//   console.log('*****************\nqs: ', queryString, '\nvals: ', values, '\n**************');

//   return pool.query(queryString, values)
//     .then(res => res.rows[0]);
// };

module.exports = {
  addMessage
}

