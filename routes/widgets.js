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
  getAllMessagesForUserByListingID,
  getMessagesAndSellerUsernameWithListingIDAndBuyerID,
  getMessagesAndBuyerUsernameWithListingIDAndSellerID
} = require('../lib/messages-queries')

const {
  addListingWithImgs,
  deleteListingByID,
  editListingByID } = require("../lib/listings-mod")

const { addMessage} = require("../lib/messages-mod")

//get all list from city
router.get("/cities/:city", (req, res) => {
  const city = req.params.city;
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
  getAllListingsByFilters(req.query)
    .then((result) => {
      res.send({ result })
    }).catch((err) => {
      console.error('search', err)
      res.send({ error })
    })
})



// show message list by seller and buyer
router.get("/messages/:id", (req, res) => {
  const sellerId = req.session.user_id;
  const listingId = req.params.id
  let obj = {}
  getMessagesAndBuyerUsernameWithListingIDAndSellerID(listingId, sellerId)
    .then((results1) => {
      obj["bySeller"] = results1;
      const buyerId = results1[0].buyer_id;
  getMessagesAndSellerUsernameWithListingIDAndBuyerID(listingId, buyerId)
    .then((results2) => {
      obj["byBuyer"] = results2
       res.send(obj)
    }).catch((error) => {
      console.error(error);
      res.json({error});
    })
  })
})

//show all products by time, favourit and user's name
router.get('/', (req, res) => {
  const userId = req.session.user_id;
  Promise.all([
    getAllListingsByMostRecent(),
    getMostFavouritedListings(),
    // getUserByID(userId),
  ]).then((result) => {
    const [result1, result2] = result
    res.send({
      mostRecent: result1,
      MostFav: result2,
      // userId: result3
    })
  }).catch(err => {
    console.error('home', err);
    res.status(500).json({ error })
  })
})

//delete card by listid
router.post("/listings/manage/:id/delete", (req,res) => {
  const listingID = req.params.id;
  deleteListingByID(listingID)
    .then(() => {
      console.log("cancelled");
      res.redirect("/listings/manage")
    }).catch((err) =>{
      console.error(err);
      res.json({err});
    })
})


//edite card by listId 
router.post("/listings/manage/:id", (req, res) => {
  const updateInfo = req.body;
  const listingId = req.params.id;
  editListingByID(listingId, updateInfo)
    .then(() =>{
      res.redirect("/listings")
    }).catch((err) =>{
      console.error(err);
      res.json({err});
    })
})

//add cards in the listing 
router.post("/listings/manage", (req, res) => {
  const {obj, picture} = req.body; //should be a json here
  addListingWithImgs(obj, picture)
    .then(() => {
      console.log("you added the these new informaiton")  //where should i redirect to??
      res.redirect("/listings/manage")
    }).catch((err) => {
      console.error(err);
      res.json({err});
    })
})

//add message
router.post("/message", (req, res) => {
  const obj = req.body;
  addMessage(obj)
    .then(() => {
       res.redirect('/')
    }).catch((err) => {
      console.error(err);
      res.json({err})
    })
})




module.exports = router;

