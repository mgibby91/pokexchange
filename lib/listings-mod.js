const pool = require('./db');

// ****************************************************************
// INSERT, EDIT and DELETE queries for listing
// ****************************************************************

// insert into listings
//   (user_id, title, price, condition, time_posted, description, city, category_id, active)
// values
//   (2, 'Hornbill, southern ground', 200, 'hub', '2020-03-16T17:28:42Z', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 'Al Mazra‘ah ash Sharqīyah', 8, true);



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
  // console.log(queryString);
  // console.log(values);

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
          .then(res => console.log(res.rows[0]));
      }
    });

}

addListingWithImgs({
  user_id: 2,
  title: 'Hornbill',
  price: 2000,
  condition: 'hub',
  time_posted: 'now()',
  description: 'sfgdfSAGFNGFSANFGSG',
  city: 'Calgary',
  category_id: 3,
  active: true,
}, [
  'http://dummyimage.com/153x190.bmp/ff4444/ffffff',
  'http://dummyimage.com/239x101.jpg/ff4444/ffffff'
]);
