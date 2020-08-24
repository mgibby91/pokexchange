const {
  getAllListingsByMostRecent,
  getAllListingsByUserID,
  getAllListingsByCity,
  getAllListingsByCategory,
  getAllListingsUserFavourited,
  getMostFavouritedListings,
  getAllListingsByFilters,
} = require('./listing-queries');

const {
  getAllMessagesByListingID,
  getAllMessagesByUserID,
  getAllMessagesForUserByListingID,
} = require('./messages-queries');

const {
  getUserByID,
  getUserByUsername,
} = require('./users-queries');

// getAllListingsByUserID(1);
// getAllListingsUserFavourited(1);
// getAllMessagesByUserID(5);
// getAllMessagesForUserByListingID(2, 16);
// getMostFavouritedListings();
// getAllListingsByFilters({
//   category: 'Plushies',
//   max_price: 6,
//   min_price: 1
// })

// getUserByID(10);
getUserByUsername('mdaniely9');
