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

// getAllListingsUserFavourited(2).then(res => console.log(res));
getAllMessagesByUserID(8).then(res => console.log(res));
// getAllMessagesForUserByListingID(2, 16);
// getMostFavouritedListings().then(res => console.log(res));
// getAllListingsByFilters({
//   category: 'Plushies',
//   max_price: 6,
//   min_price: 1
// });
// getAllListingsByUserID(3).then(res => console.log(res));
// getAllListingsByMostRecent().then(res => console.log(res))
// getAllListingsByCategory('Toys').then(res => console.log(res));
// getAllListingsByCity('Longra').then(res => console.log(res));
// object.then(res => console.log(res));

// getUserByID(10);
// getUserByUsername('mdaniely9');
