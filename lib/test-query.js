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

getAllListingsUserFavourited(2);
// getAllMessagesByUserID(5);
// getAllMessagesForUserByListingID(2, 16);
// getMostFavouritedListings();
// const array = getAllListingsByFilters({
//   category: 'Plushies',
//   max_price: 6,
//   min_price: 1
// })

// getAllListingsByUserID(3);
// getAllListingsByMostRecent();
// getAllListingsByCategory('Plushies');
// getAllListingsByCity('Longra');

// getUserByID(10);
// getUserByUsername('mdaniely9');
