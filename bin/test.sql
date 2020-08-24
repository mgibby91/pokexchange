
SELECT listings.*, count(favourites.id) as number_of_favourites
FROM listings
  JOIN favourites ON listing_id = listings.id
GROUP BY listings.id
ORDER BY number_of_favourites DESC
LIMIT 3;
