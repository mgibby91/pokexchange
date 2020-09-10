const {
  getAllListingsByMostRecent,
  getAllListingsByUserID,
  getAllListingsByCity,
  getAllListingsByCategory,
  getAllListingsUserFavourited,
  getMostFavouritedListings,
  getAllListingsByFilters,
  getListingByListingID,
  getAllFavouritesByUserID
} = require('./listing-queries');

getAllFavouritesByUserID(1).then(res => console.log(res));

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

const {
  addListingWithImgs,
  actuallyDeleteListingByID,
  addFavouriteToListing
} = require('./listings-mod');

