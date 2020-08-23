const client = require('./db');

// get all listings order by most recent
const getAllListingsByMostRecent = function(limit = 10, offset = 0) {

  const values = [limit, offset];

  return client.query(`
  SELECT *
  FROM listings
  ORDER BY time_posted DESC
  LIMIT $1
  OFFSET $2
  `, values)
    .then(res => {
      if (!res.rows.length) {
        return null;
      }
      console.log(res.rows);
      client.end();
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    })

}

// get all listings posted by user
const getAllListingsByUserID = function(userID, limit = 10, offset = 0) {

  const values = [userID, limit, offset];

  return client.query(`
  SELECT *
  FROM listings
    JOIN users ON user_id = users.id
  WHERE users.id = $1
  ORDER BY time_posted DESC
  LIMIT $2
  OFFSET $3;
  `, values)
    .then(res => {
      if (!res.rows.length) {
        return null;
      }
      console.log(res.rows);
      client.end();
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    })


}

// get all listings of specific category
const getAllListingsByCategory = function(categoryType, limit = 10, offset = 0) {

  const values = [categoryType, limit, offset];

  return client.query(`
  SELECT *
  FROM listings
    JOIN categories ON category_id = categories.id
  WHERE categories.name = $1
  ORDER BY time_posted DESC
  LIMIT $2
  OFFSET $3;
  `, values)
    .then(res => {
      if (!res.rows.length) {
        return null;
      }
      console.log(res.rows);
      client.end();
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    })

}

// get all listings by specific search term
const getAllListingsByPriceRange = function(minPrice, maxPrice, orderByLowOrHigh = 'ASC', limit = 10, offset = 0) {

  const values = [minPrice, maxPrice, limit, offset];

  return client.query(`
  SELECT *
  FROM listings
  WHERE price > $1 AND price < $2
  ORDER BY price ${orderByLowOrHigh}
  LIMIT $3
  OFFSET $4;
  `, values)
    .then(res => {
      if (!res.rows.length) {
        return null;
      }
      console.log(res.rows);
      client.end();
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    })

}

// get all listings that have been favourited by user
const getAllListingsUserFavourited = function(userID, limit = 10, offset = 0) {

  const values = [userID, limit, offset];

  return client.query(`
  SELECT *
  FROM listings
    JOIN favourites ON listing_id = listings.id
    JOIN users ON favourites.user_id = users.id
  WHERE favourites.user_id = $1
  ORDER BY listings.time_posted DESC
  LIMIT $2
  OFFSET $3;
  `, values)
    .then(res => {
      if (!res.rows.length) {
        return null;
      }
      console.log(res.rows);
      client.end();
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    })

}

module.exports = {
  getAllListingsByMostRecent,
  getAllListingsByUserID,
  getAllListingsByCategory,
  getAllListingsByPriceRange,
  getAllListingsUserFavourited,
};

