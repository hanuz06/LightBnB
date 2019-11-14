SELECT
  properties.id,
  properties.title,
  properties.cost_per_night,
  reservations.start_date,
  AVG(rating) as average_rating
FROM
reservations  
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON property_reviews.property_id = properties.id 
WHERE
  reservations.guest_id = 1 AND reservations.end_date <= now()::date
GROUP BY
  reservations.id,
  properties.id
ORDER BY
  reservations.start_date 
LIMIT
  10;


-- --Correct answer
-- SELECT properties.*, reservations.*, avg(rating) as average_rating
-- FROM reservations
-- JOIN properties ON reservations.property_id = properties.id
-- JOIN property_reviews ON properties.id = property_reviews.property_id 
-- WHERE reservations.guest_id = 1
-- AND reservations.end_date < now()::date
-- GROUP BY properties.id, reservations.id
-- ORDER BY reservations.start_date
-- LIMIT 10;

