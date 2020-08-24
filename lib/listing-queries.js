const pool = require('./db');

// get all listings order by most recent
const getAllListingsByMostRecent = function(limit = 10, offset = 0) {

  const values = [limit, offset];

  return pool.query(`
  SELECT *, listings.id as listing_id, categories.name as category
  FROM listings
  JOIN categories ON category_id = categories.id
  ORDER BY time_posted DESC
  LIMIT $1
  OFFSET $2
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
    })

}

// get all listings posted by user
const getAllListingsByUserID = function(userID, limit = 10, offset = 0) {

  const values = [userID, limit, offset];

  return pool.query(`
  SELECT *, listings.id as listing_id, categories.name as category
  FROM listings
    JOIN users ON listings.user_id = users.id
    JOIN categories ON category_id = categories.id
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
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    })


}

// get all listings of specific category
const getAllListingsByCategory = function(categoryType, limit = 10, offset = 0) {

  const values = [categoryType, limit, offset];

  return pool.query(`
  SELECT *, listings.id as listing_id
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
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    })

}

// get all listings by specific search term
const getAllListingsByPriceRange = function(minPrice, maxPrice, orderByLowOrHigh = 'ASC', limit = 10, offset = 0) {

  const values = [minPrice, maxPrice, limit, offset];

  return pool.query(`
  SELECT *, listings.id as listing_id, categories.name as category
  FROM listings
  JOIN categories ON category_id = categories.id
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
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    })

}

// get all listings that have been favourited by user
const getAllListingsUserFavourited = function(userID, limit = 10, offset = 0) {

  const values = [userID, limit, offset];

  return pool.query(`
  SELECT *, listings.id as listing_id, categories.name as category
  FROM listings
    JOIN favourites ON listing_id = listings.id
    JOIN users ON favourites.user_id = users.id
    JOIN categories ON category_id = categories.id
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
      return res.rows;
    })
    .catch(err => {
      console.error(err);
    })

}


// get all listings by date range
const getAllListingsByDateRange = function(startDate, endDate, limit = 10, offset = 0) {

  const values = [startDate, endDate, limit, offset];

  pool.query(`
  SELECT *, listings.id as listing_id, categories.name as category
  FROM listings
    JOIN categories ON category_id = categories.id
  WHERE time_posted > $1 AND time_posted < $2
  ORDER BY time_posted DESC
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
    })

}


// get all listings by city
const getAllListingsByCity = function(cityName, limit = 10, offset = 0) {

  const values = [cityName, limit, offset];

  pool.query(`
  SELECT *, listings.id as listing_id, categories.name as category
  FROM listings
    JOIN categories ON category_id = categories.id
  WHERE city = $1
  ORDER BY time_posted DESC
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
    })

}


// get all listings by condition (array)
const getAllListingsByCondition = function(condition, limit = 10, offset = 0) {

  const values = [condition, limit, offset];

  pool.query(`
  SELECT *, listings.id as listing_id, categories.name as category
  FROM listings
    JOIN categories ON category_id = categories.id
  WHERE condition = $1
  ORDER BY time_posted DESC
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

module.exports = {
  getAllListingsByMostRecent,
  getAllListingsByUserID,
  getAllListingsUserFavourited,
  getAllListingsByCategory,
  getAllListingsByCity,
  getAllListingsByPriceRange,
  getAllListingsByDateRange,
  getAllListingsByCondition,
};

