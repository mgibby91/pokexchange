/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const {
  getAllListingsByMostRecent,
  getAllListingsByUserID,
  getAllListingsByCategory,
  getAllListingsByPriceRange,
  getAllListingsUserFavourited,
  addCards,
  updateCards
} = require('../lib/listing-queries');

// const options = {title: "big"}
// const id = 57
// updateCards(options, id)

//delete cards
router.

//edit cards
router.get('/listing/:id', (req, res) => {
  const userId = req.session.user_id;
  const cardId = req.params.id
  // console.log(updateCards({...req.body, user_id: userId}, cardId))
  const data = {cardId: updateCards({...req.body, user_id: userId}, cardId)};
  res.render("test_show", data)
})
router.post("/listing/:id", (req, res) => {
  const userId = req.session.user_id;
  const cardId = req.params.id
  updateCards({...req.body, user_id: userId}, cardId)
    .then((cards) =>{
      console.log(cards)
      res.redirect('/')
    })
})
//show the user-lists
router.get('/creat_list', (req,res) => {
  const userId = req.session.user_id
 getAllListingsByUserID(userId)
  .then((uresults) => {
    res.render('test1', {uresults})
  })
})

//show the user-favout list
router.get('/favourites', (req, res) => {
  const userId = req.session.user_id
  getAllListingsUserFavourited(userId)
  .then((fresults) => {
    res.render('test2', {fresults})
  })
})

//user add new products
router.get('/new', (req, res) => {
  const userId = req.session.user_id;
  res.render('test3', addCards({...req.body, user_id: userId}))
})

router.post('/', (req, res) => {
  const userId = req.session.user_id;
  addCards({...req.body, user_id: userId})
   .then((cards) => {
     console.log(cards)
    //  res.send(cards)
     res.redirect('/')
   })
})






//show all products by time
router.get('/', (req, res) => {
  getAllListingsByMostRecent()
    .then((results) => {
      res.render("test", {results})
    })
})






// router.get('/category')

// router.get('/', (req,res) => {
//   const userId = req.session.userId;
//   if (!userId) {
//     res.send('please login first')
//     return;
//   }
//   getAllListingsByUserID(userId)
//    .then((results) => {
//      console.log (results)
//      res.render('test1', {results})
//    })
//    .catch(e => {
//     res.send(e)
//   });
// })

module.exports = router;

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     let query = `SELECT * FROM widgets`;
//     console.log(query);
//     db.query(query)
//       .then(data => {
//         const widgets = data.rows;
//         res.json({ widgets });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };
