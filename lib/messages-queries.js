const pool = require('./db');

// get all messages by listing
const getAllMessagesByListingID = function(listingID, limit = 10, offset = 0) {

  const values = [listingID, limit, offset];

  return pool.query(`
  SELECT *
  FROM messages
  WHERE listing_id = $1
  ORDER BY time_sent
  LIMIT $2
  OFFSET $3;
  `, values)
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

// get all messages by user id
const getAllMessagesByUserID = function(userID, limit = 10, offset = 0) {

  const values = [userID, limit, offset];

  return pool.query(`
  SELECT *
  FROM messages
  WHERE buyer_id = $1 OR seller_id = $1
  ORDER BY time_sent
  LIMIT $2
  OFFSET $3;
  `, values)
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

// get all messages for specific listing by userid
const getAllMessagesForUserByListingID = function(userID, listingID, limit = 10, offset = 0) {

  const values = [userID, listingID, limit, offset];

  return pool.query(`
  SELECT *
  FROM messages
  WHERE (buyer_id = $1 OR seller_id = $1) AND listing_id = $2
  ORDER BY time_sent
  LIMIT $3
  OFFSET $4;
  `, values)
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
  getAllMessagesByListingID,
  getAllMessagesByUserID,
  getAllMessagesForUserByListingID
}
