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

} = require('../lib/listing-queries');


//delete cards
router.post("/listing/:id/delete", (req,res) => {
  const userId = req.session.user_id;
  // for the delete function need to wait for function name
  // deleteListingByUserID(userId)
  //   .then((result) =>{
  //     res.send(result)
  //   }).catch(err =>{
  //     console.error(err);
  //     res.status(500).json({error})
  //  })
})

//delete favourate
router.post("/favourites/:id/delete", (req,res) => {
  const userId = req.session.user_id;
  // for the delete function need to wait for function name
  // deleteFavourateByUserID(userId)
  //   .then((result) =>{
  //     res.send(result)
  //   }).catch(err => {
  //    console.error(err)  
  //     res.status(500).json({error})  
  // })
})

//edit cards--not sure if it is work or not
// router.get("/listing/:id", (req, res) => {
//   const userId = req.session.user_id;
//   const cardId = req.params.id
//   const data = {cardId: updateCards({...req.body, user_id: userId}, cardId)};
//   res.render("test_show", data)
// })
//edit cars information
router.post("/listing/:id", (req, res) => {
  const userId = req.session.user_id;
  const cardId = req.params.id
  //updatecards is not real function
  updateCards({...req.body, user_id: userId}, cardId)
    .then((cards) =>{
      console.log(cards)
      res.send({cards})
    }).catch(err =>{
      console.error(err);
      res.status(500).json({error})
   })
})

//show the user-lists
router.get('/creat_list', (req,res) => {
  const userId = req.session.user_id
 getAllListingsByUserID(userId)
  .then((uresults) => {
    res.send({uresults})
  }).catch(err =>{
    console.error(err);
    res.status(500).json({error})
  })
})

//show the user-favout list
router.get('/favourites', (req, res) => {
  const userId = req.session.user_id
  getAllListingsUserFavourited(userId)
    .then((fresults) => {
      res.send({fresults})
    }).catch(err =>{
      console.error(err);
      res.status(500).json({error})
    })
})


//user add new products, not sure if i need get or not
// router.get('/listing/new', (req, res) => {
//   const userId = req.session.user_id;
//   addCards({...req.body, user_id: userId})
//     .then((newCard) =>{
//        res.send({newCard})
//     })
// })

//add new cards
router.post('/new', (req, res) => {
  const userId = req.session.user_id;
  //addcards is not the really function
  addCards({...req.body, user_id: userId})
   .then((cards) => {
     console.log(cards)
     res.json({ok: "ok"})
    //  res.json({cards})
   }).catch(err =>{
      console.error(err);
      res.status(500).json({error})
   })
})

//add favorate
router.post('/favourates/new', (req, res) =>{
  const userId = req.session.user_id;
  //addfavourates is not real function
  addfavourate({...req.body, user_id: userId})
    .then((cards) =>{
      res.json({cards})
    }).catch(err =>{
      console.error(err);
      res.status(500).json({error})
    })
})

//show all products by time, catagary and user's name
router.get('/', (req, res) => {
  Promise.all([
    getAllListingsByMostRecent(),
    getAllListingsByCategory('Cards'),
    getAllListingsByCategory('Video Games'),
    getAllListingsByCategory('Clothing'),
    getAllListingsByCategory('Toys'),
    getAllListingsByCategory('Plushies'),
    getAllListingsByCategory('Movies'),
    getAllListingsByCategory('Accessories'),//need to change the favourate function
    getAllListingsByCategory('Other')
    //need city list
    //need user list
  ]).then((result) => {
    const [result1, result2, result3, result4,result5, result6, result7, result8,result9, result10, result11, result12, result13,result14] = result
    res.json({mostRecent:result1, cards:result2, videoGames: result3, 
      clothing: result4, toys: result5, plushies: result6, 
      movies: result7, accessories: result8, others: result9,
      vancouver: result10, montreal: result11, toronto: result12, 
      calgary: result13, victoria: result14})
  }).catch(err =>{
    console.error(err);
    res.status(500).json({error})
  })
})




module.exports = router;

