const pool = require('./db');
const { addImagesToListingQuery } = require('./helper-functions');

// get all listings order by most recent
const getAllListingsByMostRecent = function(limit = 10, offset = 0) {

  const values = [limit, offset];

  return new Promise((resolve, reject) => {
    pool.query(`
    SELECT *, listings.id as listing_id, categories.name as category
    FROM listings
    JOIN categories ON category_id = categories.id
    ORDER BY time_posted DESC
    LIMIT $1
    OFFSET $2
    `, values)
      .then(res => {
        addImagesToListingQuery(res.rows)
          .then(res => {
            resolve(res);
          });
      })
      .catch(err => {
        console.error(err);
      })

  })


}

// get all listings posted by user
const getAllListingsByUserID = function(userID, limit = 10, offset = 0) {

  const values = [userID, limit, offset];

  return new Promise((resolve, reject) => {
    pool.query(`
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
        addImagesToListingQuery(res.rows)
          .then(res => {
            resolve(res);
          });
      })
      .catch(err => {
        console.error(err);
      })

  })


}

// get all listings of specific category
const getAllListingsByCategory = function(categoryType, limit = 10, offset = 0) {

  const values = [categoryType, limit, offset];

  return new Promise((resolve, reject) => {
    pool.query(`
    SELECT *, listings.id as listing_id
    FROM listings
      JOIN categories ON category_id = categories.id
    WHERE categories.name = $1
    ORDER BY time_posted DESC
    LIMIT $2
    OFFSET $3;
    `, values)
      .then(res => {
        addImagesToListingQuery(res.rows)
          .then(res => {
            resolve(res);
          });
      })
      .catch(err => {
        console.error(err);
      })
  })


}

// get all listings that have been favourited by user
const getAllListingsUserFavourited = function(userID, limit = 10, offset = 0) {

  const values = [userID, limit, offset];

  return new Promise((resolve, reject) => {
    pool.query(`
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
        addImagesToListingQuery(res.rows)
          .then(res => {
            resolve(res);
          });
      })
      .catch(err => {
        console.error(err);
      })
  })


}

// get all listings by city
const getAllListingsByCity = function(cityName, limit = 10, offset = 0) {

  const values = [cityName, limit, offset];

  return new Promise((resolve, reject) => {
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
        addImagesToListingQuery(res.rows)
          .then(res => {
            resolve(res);
          });
      })
      .catch(err => {
        console.error(err);
      })
  })


}

// get top listings by favourited
const getMostFavouritedListings = function(limit = 3) {

  return new Promise((resolve, reject) => {
    pool.query(`
    SELECT listings.*, count(favourites.id) as number_of_favourites, listings.id as listing_id
    FROM listings
      JOIN favourites ON listing_id = listings.id
    GROUP BY listings.id
    ORDER BY number_of_favourites DESC
    LIMIT $1;
    `, [limit])
      .then(res => {
        addImagesToListingQuery(res.rows)
          .then(res => {
            resolve(res);
          }).catch(err => console.log(err));
      })
      .catch(err => {
        console.error(err);
      })
  })


}


// listings filter search function
const getAllListingsByFilters = function(options, limit = 10) {

  const queryParams = [];

  let queryString = `
  SELECT listings.*, listings.id as listing_id, categories.name as category
  FROM listings
  JOIN categories ON category_id = categories.id
  `;

  for (const option in options) {
    if (!queryParams.length) {
      queryString += 'WHERE ';
    } else {
      queryString += 'AND ';
    }

    switch (options[option]) {
      case options.title:
        queryParams.push(`%${options[option]}%`);
        queryString += `listings.title LIKE $${queryParams.length} `;
        break;
      case options.condition:
        queryParams.push(options[option]);
        queryString += `listings.condition = $${queryParams.length} `;
        break;
      case options.city:
        queryParams.push(`%${options[option]}%`);
        queryString += `listings.city LIKE $${queryParams.length} `;
        break;
      case options.category:
        queryParams.push(options[option]);
        queryString += `categories.name = $${queryParams.length} `;
        break;
      case options.min_price:
        queryParams.push(options[option] * 100);
        queryString += `listings.price >= $${queryParams.length} `;
        break;
      case options.max_price:
        queryParams.push(options[option] * 100);
        queryString += `listings.price <= $${queryParams.length} `;
        break;
    }
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY listings.time_posted DESC
  LIMIT $${queryParams.length};
  `;

  return new Promise((resolve, reject) => {
    pool.query(queryString, queryParams)
      .then(res => {
        addImagesToListingQuery(res.rows)
          .then(res => {
            resolve(res);
          });
      })
      .catch(err => {
        console.error(err);
      });
  })


}

module.exports = {
  getAllListingsByMostRecent,
  getAllListingsByUserID,
  getAllListingsUserFavourited,
  getAllListingsByCategory,
  getAllListingsByCity,
  getMostFavouritedListings,
  getAllListingsByFilters,
};
