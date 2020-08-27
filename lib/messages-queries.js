const pool = require('./db');

// get all messages by listing
const getAllMessagesByListingID = function(listingID, limit = 100, offset = 0) {

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
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    });

}

// get all messages by user id
const getAllMessagesByUserID = function(userID, limit = 100, offset = 0) {

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
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    });

}

// get all messages for specific listing by userid
const getAllMessagesForUserByListingID = function(userID, listingID, limit = 100, offset = 0) {

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
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    });

}


const getMessagesAndSellerUsernameWithListingIDAndBuyerID = function(listingID, buyerID) {

  const values = [listingID, buyerID];

  return pool.query(`
  SELECT *, users.username as seller_username
  FROM messages
  JOIN users ON seller_id = users.id
  WHERE messages.listing_id = $1 AND messages.buyer_id = $2
  ORDER by time_sent;
  `, values)
    .then(res => {
      if (!res.rows.length) {
        return null;
      }
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    });

}

const getMessagesAndBuyerUsernameWithListingIDAndSellerID = function(listingID, sellerID) {

  const values = [listingID, sellerID];

  return pool.query(`
  SELECT *, users.username as buyer_username
  FROM messages
  JOIN users ON buyer_id = users.id
  WHERE messages.listing_id = $1 AND messages.seller_id = $2
  ORDER by time_sent;
  `, values)
    .then(res => {
      if (!res.rows.length) {
        return null;
      }
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    });

}


const getAllMessagesWithUsersListings = function(userID) {

  const values = [userID];

  return pool.query(`
  SELECT listings.id,
       title,
       u1.id AS buyerID,
       u1.username AS buyer,
       u2.id AS sellerID,
       u2.username AS seller,
       COUNT(messages.id) AS total_messages_exchanged
  FROM listings
    JOIN messages ON listings.id = listing_id
    JOIN users u1 ON u1.id = buyer_id
    JOIN users u2 ON u2.id = seller_id
  WHERE buyer_id = $1 OR seller_id = $1
  GROUP BY listings.id, u2.id, u1.id
  ORDER BY listings.id DESC;
  `, values)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log(err);
    })

}



module.exports = {
  getAllMessagesByListingID,
  getAllMessagesByUserID,
  getAllMessagesForUserByListingID,
  getMessagesAndSellerUsernameWithListingIDAndBuyerID,
  getMessagesAndBuyerUsernameWithListingIDAndSellerID,
  getAllMessagesWithUsersListings,
}
