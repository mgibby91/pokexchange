const express = require('express');
const router = express.Router();

const {
  getAllListingsByMostRecent,
  getAllListingsByUserID,
  getAllListingsUserFavourited,
  getAllListingsByCategory,
  getAllListingsByCity,
  getMostFavouritedListings,
  getAllListingsByFilters,
  getListingByListingID,
} = require('../lib/listing-queries');

router.get('/listings/:id', (req, res) => {
  const listingID = req.params.id;
  console.log(req.params);
  // console.log(listingID);
  getListingByListingID(listingID)
    .then(result => {
      // console.log(result);
      res.send(result)
    })
    .catch(err => {
      console.log('error in listings routes', err);
    })
})



module.exports = router;
