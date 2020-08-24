const {
  getAllListingsByMostRecent,
  getAllListingsByUserID,
  getAllListingsByCategory,
  getAllListingsByPriceRange,
  getAllListingsUserFavourited,
  getAllListingsByDateRange,
  getAllListingsByCity,
  getAllListingsByCondition,
} = require('./listing-queries');

const {
  getAllMessagesByListingID,
  getAllMessagesByUserID,
  getAllMessagesForUserByListingID,
} = require('./messages-queries');

// getAllListingsByUserID(1);
// getAllListingsUserFavourited(1);
// getAllMessagesByUserID(5);
getAllMessagesForUserByListingID(2, 16);
