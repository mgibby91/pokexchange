const pool = require('./db');

const addImagesToListingQuery = function(queryArray) {
  listingIDs = [];

  for (let item of queryArray) {
    const listingID = item.listing_id;
    listingIDs.push(listingID);
  }

  return pool.query(`
  SELECT listing_id, image_url
  FROM images
  WHERE listing_id IN (${listingIDs.join(', ').trim()})
  ORDER BY listing_id;
    `)
    .then(res => {

      let updatedQueryArray = [];

      for (let item of queryArray) {
        for (let img of res.rows) {
          if (item.listing_id === img.listing_id) {
            if (!item.img_url) {
              item.img_url = [img.image_url];
              updatedQueryArray.push(item);
            } else {
              item.img_url.push(img.image_url);
              updatedQueryArray.push(item);
            }
          }
        }
      }

      updatedQueryArray = [...new Set(updatedQueryArray)];

      return updatedQueryArray;
    });

}

module.exports = {
  addImagesToListingQuery
}
