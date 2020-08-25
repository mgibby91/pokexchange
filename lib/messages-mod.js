const pool = require('./db');

// ****************************************************************
// INSERT queries for messages
// ****************************************************************

// insert into messages
//   (buyer_id, seller_id, text_body, time_sent, written_by, active, listing_id)
// values
//   (2, 8, 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', '2020-02-09T06:36:47Z', 10, false, 16);


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
    });

}

module.exports = {
  addMessage
}



// addMessage({
//   buyer_id: 8,
//   seller_id: 2,
//   text_body: 'Hey, what up?',
//   time_sent: 'now()',
//   written_by: 10,
//   active: true,
//   listing_id: 20
// });
