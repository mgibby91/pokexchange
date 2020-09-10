
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
} = require('../lib/listing-queries');

const { getUserByID, getUserByUsername } = require('../lib/users-queries')

const {
  getAllMessagesByListingID,
  getAllMessagesByUserID,
  getAllMessagesForUserByListingID,
  getMessagesAndSellerUsernameWithListingIDAndBuyerID,
  getMessagesAndBuyerUsernameWithListingIDAndSellerID,
  getAllMessagesWithUsersListings,
  getAllMessagesForListingIDBySpecificUsers
} = require('../lib/messages-queries');

const {
  addListingWithImgs,
  deleteListingByID,
  editListingByID,
  actuallyDeleteListingByID,
  addFavouriteToListing } = require("../lib/listings-mod")

const { addMessage } = require("../lib/messages-mod")

// get all list from city
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
  console.log('categories req', req.params.name);
  let name = req.params.name;
  name = name[0].toUpperCase() + name.slice(1);
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

// //for the search part
// router.get("/search/", (req, res) => {
//   // console.log('req.query', req.query);
//   let queryObj;
//   for (let item in req.query) {
//     // console.log('key', item);
//     queryObj = item;
//   }
//   const query = JSON.parse(queryObj);
//   // console.log('query', query);
//   getAllListingsByFilters(query)
//     .then((result) => {
//       console.log('result', result);
//       res.render('search-results');
//     }).catch((err) => {
//       console.error('search', err)
//       res.send({ error })
//     })
// })

//Marisa
router.get("/messages/:id/:otherUser", (req, res) => {
  if (!req.session.user_id) {
    req.session.user_id = 1;
  }
  const userID = req.session.user_id;
  const listingID = req.params.id;
  const otherUserID = req.params.otherUser;
  getAllMessagesForListingIDBySpecificUsers(userID, otherUserID, listingID)
    .then((results) => {
      res.json({ userID, results });
    }).catch((error) => {
      console.error(error);
      res.json({ error });
    });
});


//show all products by time, favourite and user's name
router.get('/', (req, res) => {
  if (!req.session.user_id) {
    req.session.user_id = 1;
  }
  const userId = req.session.user_id;
  Promise.all([
    getAllListingsByMostRecent(),
    getMostFavouritedListings(),
    getUserByID(userId),
  ]).then((result) => {
    const [result1, result2, result3] = result;
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


//delete card by listingid
router.post("/listings/manage/:id/delete", (req, res) => {
  const listingID = req.params.id;
  deleteListingByID(listingID)
    .then((results) => {
      console.log("cancelled");
      res.send({ results });
    }).catch((err) => {
      console.error(err);
      res.json({ err });
    })
})

//edite card by listingId
router.post("/listings/manage/:id", (req, res) => {
  const listingID = Number(req.body.listing_id);
  actuallyDeleteListingByID(listingID)
    .then(result => {

      const categoryIDs = {
        'Cards': 1,
        'Video-games': 2,
        'Clothing': 3,
        'Toys': 4,
        'Plushies': 5,
        'Movies': 6,
        'Accessories': 7,
        'Other': 8,
      }

      req.body.category_id = categoryIDs[req.body.category];
      delete req.body.category;

      const imgArray = [req.body.imgUrl];
      delete req.body.imgUrl;
      delete req.body.listing_id;

      if (req.body.price[0] === '$') {
        req.body.price = Number(req.body.price.slice(1)) * 100;
      } else {
        req.body.price = Number(req.body.price) * 100;
      }

      req.body.time_posted = 'now()';
      req.body.user_id = req.session.user_id;

      addListingWithImgs(req.body, imgArray)
        .then((results) => {
          console.log('results', results);
          addFavouriteToListing(results.id, req.session.user_id)
            .then(result => {
              res.redirect('/my_listings');
            })
            .catch(err => console.log(err));
        }).catch((err) => {
          console.error(err);
        })


    })
    .catch(err => {
      console.log(err);
    });
})


//add cards in the listing
router.post("/listings/manage", (req, res) => {

  console.log(req.body);

  for (let key in req.body) {
    if (!req.body[key]) {
      res.status(403).send('<h1>Status of 403: Forbidden Request. Please Enter All Fields Before Submitting</h1>');
    }
  }

  if (req.body.price[0] === '$') {
    req.body.price = Number(req.body.price.slice(1)) * 100;
  } else {
    req.body.price = Number(req.body.price) * 100;
  }

  console.log(req.body);

  const imgArray = [req.body.imgUrl];
  delete req.body.imgUrl;
  const queryObj = req.body;

  const categoryIDs = {
    'Cards': 1,
    'Video-games': 2,
    'Clothing': 3,
    'Toys': 4,
    'Plushies': 5,
    'Movies': 6,
    'Accessories': 7,
    'Other': 8,
  }

  queryObj.category_id = categoryIDs[queryObj.category];
  delete queryObj.category;

  queryObj.time_posted = 'now()';
  queryObj.user_id = req.session.user_id;

  console.log(queryObj);
  console.log(imgArray);

  addListingWithImgs(queryObj, imgArray)
    .then((results) => {
      console.log(results);
      res.render('index.ejs');
    }).catch((err) => {
      console.error(err);
      res.json({ err });
    })
});

//add message
router.post("/messages", (req, res) => {
  const obj = req.body;
  console.log('obj: ', obj);
  addMessage(obj)
    .then((result) => {
      res.send({ result })
    }).catch((err) => {
      console.error(err);
      res.json({ err })
    })
})

module.exports = router;
