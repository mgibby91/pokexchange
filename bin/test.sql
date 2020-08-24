
SELECT *
FROM messages
WHERE (buyer_id = 2 OR seller_id = 2) AND listing_id = 16
ORDER BY time_sent;
