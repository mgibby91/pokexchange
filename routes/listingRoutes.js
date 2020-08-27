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
  console.log(listingID);
  getListingByListingID(listingID)
    .then(result => {
      // console.log(result);
      res.send(result)
    })
    .catch(err => {
      console.log('error in listings routes', err);
    })
})

router.get("/favourites/listings", (req, res) => {
  const userId = req.session.user_id;
  getAllListingsUserFavourited(userId)
    .then((result) => {
      console.log(result);
      res.send({ result })
    }).catch((err) => {
      console.error('listing favourites', err)
      res.json({ error })
    })
})



module.exports = router;
