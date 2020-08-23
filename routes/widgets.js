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
  addCards
} = require('../lib/listing-queries');
const { get } = require('./users');

//show the user-lists
router.get('/creat_list', (req,res) => {
  const userId = req.session.user_id
 getAllListingsByUserID(userId)
  .then((uresults) => {
    console.log ("show the userid list: ", uresults);
    res.render('test1', {uresults})
  })
})

//show the user-favout list
router.get('/favourites', (req, res) => {
  const userId = req.session.user_id
  getAllListingsUserFavourited(userId)
  .then((fresults) => {
    console.log ("show the favorate list: ", fresults)
    res.render('test2', {fresults})
  })
})

//user add new products
router.post('/', (req, res) => {
  const userId = req.session.user_id;
  addCards(({...req.body, owner_id: userId}))
   .then((cards) => {
     console.log(cards)

     res.send(cards)
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
