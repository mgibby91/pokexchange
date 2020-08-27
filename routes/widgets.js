/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

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
} = require('../lib/listing-queries'); // need to change back to listing-queries

const { getUserByID, getUserByUsername } = require('../lib/users-queries')

const {
  getAllMessagesByListingID,
  getAllMessagesByUserID,
  getAllMessagesForUserByListingID
} = require('../lib/messages-queries')


//get all list from city
router.get("/cities/:city", (req, res) => {
  let city = req.params.city;
  city = city[0].toUpperCase() + city.slice(1);
  getAllListingsByCity(city)
    .then((result) => {
      res.send({ result });
    }).catch((err) => {
      console.error('cities, city', err)
      res.json({ error });
    })
})

//get all list from category
router.get("/categories/:name", (req, res) => {
  const name = req.params.name
  getAllListingsByCategory(name)
    .then((result) => {
      res.send({ result });
    }).catch((err) => {
      console.error('categories name', err);
      res.json({ error });
    })

})
//get all listing by userId
router.get("/listings/manage", (req, res) => {
  const userId = req.session.user_id;
  getAllListingsByUserID(userId)
    .then((result) => {
      res.send({ result })
    }).catch((err) => {
      console.error('listing manage', err);
      res.json({ error })
    })
})

//get all listing by user's favorate
router.get("/listings/favourites", (req, res) => {
  const userId = req.session.user_id;
  getAllListingsUserFavourited(userId)
    .then((result) => {
      res.send({ result })
    }).catch((err) => {
      console.error('listing favourites', err)
      res.json({ error })
    })
})

//for the search part
router.get("/search", (req, res) => {
  console.log(req.query)
  getAllListingsByFilters(req.query)
    .then((result) => {
      res.send({ result })
    }).catch((err) => {
      console.error('search', err)
      res.send({ error })
    })
})

//show all products by time, favourit and user's name
router.get('/', (req, res) => {
  req.session.user_id = 1;
  const userId = req.session.user_id;
  console.log('session user id', userId);
  Promise.all([
    getAllListingsByMostRecent(),
    getMostFavouritedListings(),
    getUserByID(userId),
  ]).then((result) => {
    const [result1, result2, result3] = result;
    console.log('home route ', result3[0].username);
    res.send({
      mostRecent: result1,
      MostFav: result2,
      userId: result3
    })
  }).catch(err => {
    console.error('home', err);
    res.status(500).json({ error })
  })
})



module.exports = router;

