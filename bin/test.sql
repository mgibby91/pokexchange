
-- SELECT listings.id as listing_id, categories.name as category, listings.title as title
-- FROM listings
--   JOIN users ON listings.user_id = users.id
--   JOIN categories ON category_id = categories.id
-- WHERE users.id = 3
-- ORDER BY time_posted DESC;

SELECT listing_id as listing_id, image_url
FROM images
ORDER BY listing_id;
