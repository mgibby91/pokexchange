const {
  getAllListingsByMostRecent,
  getAllListingsByUserID,
  getAllListingsByCity,
  getAllListingsByCategory,
  getAllListingsUserFavourited,
  getMostFavouritedListings,
  getAllListingsByFilters,
  getListingByListingID,
} = require('./listing-queries');

const {
  getAllMessagesByListingID,
  getAllMessagesByUserID,
  getAllMessagesForUserByListingID,
  getMessagesAndSellerUsernameWithListingIDAndBuyerID,
  getMessagesAndBuyerUsernameWithListingIDAndSellerID,
  getAllMessagesWithUsersListings
} = require('./messages-queries');

const {
  getUserByID,
  getUserByUsername,
} = require('./users-queries');

// getAllListingsUserFavourited(2).then(res => console.log(res));
// getAllMessagesByListingID(1).then(res => console.log(res));
// getMessagesAndSellerUsernameWithListingIDAndBuyerID(1, 2).then(res => console.log(res));
// getMessagesAndBuyerUsernameWithListingIDAndSellerID(1, 1).then(res => console.log(res));
// getAllMessagesForUserByListingID(2, 1).then(res => console.log(res));
// getMostFavouritedListings().then(res => console.log(res));
// getAllListingsByFilters({
//   title: 'a',
//   category: 'Plushies',
//   max_price: 6000,
//   min_price: 10
// }).then(res => console.log(res));
// getAllListingsByUserID(2).then(res => console.log(res));
// getAllListingsByMostRecent().then(res => console.log(res))
// getAllListingsByCategory('Toys').then(res => console.log(res));
// getAllListingsByCity('Vancouver').then(res => console.log(res));
// object.then(res => console.log(res));

// getUserByID(10);
// getUserByUsername('mdaniely9');

// getListingByListingID(1).then(res => console.log(res));
// getAllMessagesWithUsersListings(1).then(res => console.log(res));
