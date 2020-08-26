
-- SELECT listings.id as listing_id, categories.name as category, listings.title as title
-- FROM listings
--   JOIN users ON listings.user_id = users.id
--   JOIN categories ON category_id = categories.id
-- WHERE users.id = 3
-- ORDER BY time_posted DESC;

-- SELECT images.id as id, listing_id as listing_id, image_url
-- FROM images
-- ORDER BY listing_id;

-- SELECT *
-- FROM listings
--   JOIN categories ON category_id = categories.id
-- JOIN images ON listing_id = listings.id
-- WHERE city = 'Calgary';

-- SELECT *
-- FROM messages;

-- SELECT *
-- FROM listings
-- WHERE id = 49;
SELECT *, users.username as seller_username
FROM messages
  JOIN users ON seller_id = users.id
WHERE messages.listing_id = 1 AND messages.buyer_id = 2
ORDER by time_sent;
