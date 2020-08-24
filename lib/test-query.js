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

getAllListingsByCondition('emulation');
