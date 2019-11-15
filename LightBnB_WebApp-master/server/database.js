const properties = require('./json/properties.json');
const users = require('./json/users.json');
const db = require('./db/index.js');

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {

  return db.query(`
  SELECT * FROM users
  WHERE email= $1
  `, [email]).then(res =>
      res ? res.rows[0] : null);
}

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return db.query(`
  SELECT * FROM users
  WHERE id = $1
  `, [id])
    .then(res =>
      res ? res.rows[0] : null);
}
//return Promise.resolve(users[id]);
//}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return db.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1,$2,$3)
  RETURNING *;
  `, [user.name, user.email, user.password])
    .then(res =>
      res ? console.log("User has been added") : null);

  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {

  return db.query(`
  SELECT
  properties.*,
  reservations.*,
  AVG(rating) as average_rating
FROM
reservations  
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON property_reviews.property_id = properties.id 
WHERE
  reservations.guest_id = $1 AND reservations.end_date <= now()::date
GROUP BY
  reservations.id,
  properties.id
ORDER BY
  reservations.start_date 
LIMIT
  $2;
  `, [guest_id, limit])
    .then(res => res.rows);

  //return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */


const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_id
    `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryParams.length < 1 ? queryString += ` WHERE properties.owner_id = $${queryParams.length}` :
      queryString += ` AND properties.owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString.length < 1 ? queryString += ` WHERE cost_per_night > $${queryParams.length}` : queryString += ` AND cost_per_night > $${queryParams.length}`;

  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString.length < 1 ? queryString += ` WHERE cost_per_night < $${queryParams.length}` :
      queryString += ` AND cost_per_night < $${queryParams.length}`;
  }

  queryString += `
    GROUP BY properties.id`

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += ` HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  }

  // 4
  queryParams.push(limit);
  queryString += `    
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;

  // 5
  //console.log(queryString, queryParams);

  // 6
  return db.query(queryString, queryParams)
    .then(res => res.rows);
}

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  let queryParams = [property.owner_id,
    property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code
  ];

  let queryString = `INSERT INTO properties (owner_id,title,description, thumbnail_photo_url, cover_photo_url,cost_per_night,parking_spaces, number_of_bathrooms,number_of_bedrooms,country,street, city, province,post_code ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
  RETURNING *;`


  return db.query(queryString, queryParams)
    .then(res => console.log(res.rows));
}
exports.addProperty = addProperty;