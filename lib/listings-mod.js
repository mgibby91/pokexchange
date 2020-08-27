const pool = require('./db');

// ****************************************************************
// INSERT, EDIT and DELETE queries for listing
// ****************************************************************


// INSERT into listings
const addListingWithImgs = function(listingObj, imageArray) {

  const values = [];
  let queryString = 'INSERT INTO listings (';

  for (let key in listingObj) {
    queryString += `${key}, `;
    values.push(`${listingObj[key]}`);
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

  queryString += ') RETURNING *, id as listing_id;';

  return pool.query(queryString, values)
    .then(res => {
      const listingID = res.rows[0].listing_id;
      console.log(listingID);

      for (let image of imageArray) {
        pool.query(`
        INSERT INTO images
        (listing_id, image_url)
        VALUES
        ($1, $2)
        RETURNING *;
        `, [listingID, image])
          .then(res => {
            console.log(res.rows[0]);
            return res.rows[0];
          });
      }
    });

}


// DELETE from listings - sets active = false
const deleteListingByID = function(listingID) {

  return pool.query(`
  UPDATE listings
  SET active = false
  WHERE id = $1
  RETURNING *;
  `, [listingID])
    .then(res => {
      console.log(res.rows[0]);
      return res.rows[0];
    })
    .catch(err => console.log(err));

}


// EDIT listing w/ multiple attributes by listing_id
const editListingByID = function(listingID, attrObj) {

  let values = [];
  let queryString = 'UPDATE listings SET ';

  for (let key in attrObj) {
    queryString += `${key} = $${values.length + 1}, `;
    values.push(attrObj[key]);
  }

  queryString = queryString.slice(0, -2);
  values.push(listingID);
  queryString += ` WHERE id = $${values.length} RETURNING *;`;

  return pool.query(queryString, values)
    .then(res => {
      console.log(res.rows[0]);
      return res.rows[0];
    })
    .catch(err => console.log(err));

}


module.exports = {
  addListingWithImgs,
  deleteListingByID,
  editListingByID
}

