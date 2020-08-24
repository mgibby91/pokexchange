
SELECT *, categories.name as category
FROM listings
  JOIN categories ON category_id = categories.id
WHERE condition = 'emulation'
ORDER BY time_posted DESC;
