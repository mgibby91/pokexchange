// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

const {
  getAllListingsByMostRecent,
  getAllListingsByUserID,
  getAllListingsUserFavourited,
  getAllListingsByCategory,
  getAllListingsByCity,
  getMostFavouritedListings,
  getAllListingsByFilters,
} = require('./lib/listing-queries'); // need to change back to listing-queries

// PG database client/connection setup

// const client = require('./lib/db.js');
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect(() => {
  console.log('connected to the db');
});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(bodyParser.json());
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const listingRoutes = require("./routes/listingRoutes");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/", usersRoutes);
app.use("/api/", widgetsRoutes);
app.use("/api/", listingRoutes);
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// *****************************************************************
// ROUTES FOR LINKS IN NAV
// *****************************************************************
app.get('/my_listings', (req, res) => {
  res.render('manage-listings.ejs');
});

app.get('/listings/new', (req, res) => {
  res.render('create-listing.ejs');
});

app.get('/listings/:id', (req, res) => {
  // console.log('req.params from server', req.params.id);
  res.render('listing.ejs');
});

app.get('/favourites/listings', (req, res) => {
  res.render('my-favourites.ejs');
});

app.get('/cities/:id', (req, res) => {
  // console.log('req.params from server', req.params.id);
  res.render('search-results');
});

app.get('/categories/:name', (req, res) => {
  // console.log('req.params from server', req.params.name);
  res.render('search-results');
});

app.get('/search', (req, res) => {

  console.log('req query', req.query);

  let queryObj = {}

  for (let key in req.query) {
    if (req.query[key] === 'Any' || req.query[key] === '') {
      continue
    }
    if (key === 'search_query') {
      newKey = 'title';
      queryObj[newKey] = req.query[key];
      continue
    }

    if (key === 'min_price' || key === 'max_price') {
      queryObj[key] = Number(req.query[key]);
      continue
    }
    queryObj[key] = req.query[key];
  }

  queryObj
  console.log(queryObj);


  getAllListingsByFilters(queryObj)
    .then((result) => {
      console.log('result', result);
      const templateVars = {
        data: result
      };
      // res.render('filter-results', templateVars);
      res.render('filter-results', templateVars);
    }).catch((err) => {
      console.error('search', err)
    })
});

<<<<<<< HEAD
app.get('/messages/:id/:otherUser', (req, res) => {
  res.render('messages.ejs');
});
=======
// app.get('/listings/manage')
>>>>>>> bdc900240b883ff073ab5b5a44381e2b006131b9

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
