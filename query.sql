SELECT listings.id,
       title,
       u1.id AS buyerID,
       u1.username AS buyer,
       u2.id AS sellerID,
       u2.username AS seller,
       COUNT(messages.id) AS total_messages_exchanged
  FROM listings
    JOIN messages ON listings.id = listing_id
    JOIN users u1 ON u1.id = buyer_id
    JOIN users u2 ON u2.id = seller_id
  WHERE buyer_id = $1 OR seller_id = $1
  GROUP BY listings.id, u2.id, u1.id;
