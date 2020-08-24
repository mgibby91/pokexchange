
SELECT *, category.name as category
FROM listings
  JOIN categories ON category_id = categories.id
WHERE price > 1 AND price < 1000
ORDER BY price ASC;
