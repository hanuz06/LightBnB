SELECT
  properties.id,
  properties.title,
  properties.cost_per_night,
  AVG(property_reviews.rating) as average_rating
FROM
  properties
  JOIN property_reviews ON property_id = properties.id
WHERE
  properties.city LIKE '%Vancouver' 
GROUP BY
  properties.id
HAVING
  AVG(property_reviews.rating) >= 4
ORDER BY
  properties.cost_per_night
LIMIT
  10;

--   --Correct answer
-- SELECT properties.*, avg(property_reviews.rating) as average_rating
-- FROM properties
-- JOIN property_reviews ON properties.id = property_id
-- WHERE city LIKE '%ancouv%'
-- GROUP BY properties.id
-- HAVING avg(property_reviews.rating) >= 4
-- ORDER BY cost_per_night
-- LIMIT 10;
