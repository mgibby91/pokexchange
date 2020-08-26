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
  // getListingByListingID,
} = require('../lib/listing-queries');

router.get('/listings/30', (req, res) => {
  const listingID = req.params.id;

})






module.exports = router;
