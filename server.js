// load .env data into process.env
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const serverless = require('serverless-http');
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
  getAllFavouritesByUserID
} = require('./lib/listing-queries');

const {
  getAllMessagesByListingID,
  getAllMessagesByUserID,
  getAllMessagesForUserByListingID,
  getMessagesAndSellerUsernameWithListingIDAndBuyerID,
  getMessagesAndBuyerUsernameWithListingIDAndSellerID,
  getAllMessagesWithUsersListings,
  getAllMessagesForListingIDBySpecificUsers
} = require('./lib/messages-queries');

const {
  actuallyDeleteListingByID,
  addFavouriteToListing
} = require('./lib/listings-mod');

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

const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const listingRoutes = require("./routes/listingRoutes");

app.use("/api/", usersRoutes);
app.use("/api/", widgetsRoutes);
app.use("/api/", listingRoutes);

// Home page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// *****************************************************************
// ROUTES FOR LINKS IN NAV
// *****************************************************************
app.get('/my_listings', (req, res) => {

  const userID = req.session.user_id;

  getAllListingsByUserID(userID)
    .then(result => {
      console.log(result);
      const templateVars = {
        data: result
      }
      res.render('manage-listings.ejs', templateVars);
    })
    .catch(err => {
      console.log(err);
    });

});

app.post('/my_listings/delete/:id', (req, res) => {

  const listingID = req.params.id;

  actuallyDeleteListingByID(listingID)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });


});

app.get('/my_listings/view_listing/:id', (req, res) => {

  const listingID = Number(req.params.id);

  getListingByListingID(listingID)
    .then(result => {
      res.send(result)
    })
    .catch(err => console.log(err));

});

app.get('/listings/new', (req, res) => {
  res.render('create-listing.ejs');
});

app.get('/listings/:id', (req, res) => {
  res.render('listing.ejs');
});

app.get('/favourites/listings', (req, res) => {
  res.render('my-favourites.ejs');
});

app.get('/cities/:id', (req, res) => {
  res.render('search-results');
});

app.get('/categories/:name', (req, res) => {
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

  console.log('queryObj', queryObj);


  getAllListingsByFilters(queryObj)
    .then((result) => {
      console.log('result', result);
      const templateVars = {
        data: result
      };
      res.render('filter-results', templateVars);
    }).catch((err) => {
      console.error('search', err)
    })
});

app.get('/messages', (req, res) => {
  if (!req.session.user_id) {
    req.session.user_id = 1;
  }
  const userID = req.session.user_id;
  getAllMessagesWithUsersListings(userID)
    .then((results) => {
      const templateVars = {
        messages: results.map((r) => {
          let otherUsername = "";
          let otherUserID = 0;
          if (userID === r.buyerid) {
            otherUsername = r.seller;
            otherUserID = r.sellerid;
          } else if (userID === r.sellerid) {
            otherUsername = r.buyer;
            otherUserID = r.buyerid;
          }
          return { ...r, otherUsername, otherUserID };
        }),
        userID
      };
      console.log(templateVars);
      res.render('messages.ejs', templateVars);
    })
    .catch((err) => {
      console.error('search', err)
    })
});

app.get('/messages/:id/:otherUser', (req, res) => {
  res.render('messages.ejs');
});

app.get('/logout/', (req, res) => {
  res.render('login-logout');
})

app.post('/login-logout/', (req, res) => {
  const userID = Number(req.body.login_logout[0]);

  req.session.user_id = userID;

  res.render('index');

});


app.get('/get_faves/', (req, res) => {
  const userID = req.session.user_id;

  getAllFavouritesByUserID(userID)
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err))

})

app.post('/like_listing', (req, res) => {
  const userID = req.session.user_id;
  const listingID = req.body.listingID;
  console.log(listingID);


  addFavouriteToListing(listingID, userID)
    .then(result => console.log(result))
    .catch(err => console.log(err))


})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
