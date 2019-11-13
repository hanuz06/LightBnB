INSERT INTO
  users (name, email, password)
VALUES
  (
    'Ramesh',
    'ramesh@mail.ru',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ),
  (
    'Andrey',
    'andrey@gmail.ca',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ),
  (
    'Mary',
    'mary@mail.io',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  );

INSERT INTO
  properties (
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    country,
    street,
    city,
    province,
    post_code,
    active
  )
VALUES
  (
    3,
    '2-bdr townhouse',
    'description',
    'https://www.shorturl.at/styEU',
    'https://www.shorturl.at/stytr',
    5000,
    2,
    1,
    2,
    'Canada',
    '4th street',
    'Calgary',
    'Alberta',
    'R7D3H5',
    true
  ),
  (
    1,
    '4-bdr condominium',
    'description',
    'https://www.shorturl.at/stfdgEU',
    'https://www.shorturl.at/34gfd',
    12000,
    2,
    1,
    4,
    'Canada',
    'Veterans street',
    'Toronto',
    'Ontario',
    'M3U2J9',
    false
  ),
  (
    2,
    '5-bdr castle',
    'description',
    'https://www.shorturl.at/styrU',
    'https://www.shorturl.at/76fgd',
    250000,
    5,
    2,
    5,
    'Canada',
    'Alexander Ave',
    'Morden',
    'Manitoba',
    'H3Q1E6',
    true
  );

INSERT INTO
  reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2019-07-01', '2019-07-10', 2, 3),
  ('2019-07-15', '2019-07-26', 1, 2),
  ('2019-10-05', '2019-10-08', 3, 1);

INSERT INTO
  property_reviews (
    guest_id,
    property_id,
    reservation_id,
    rating,
    message
  )
VALUES
  (2, 3, 1, 3, 'some text'),
  (1, 2, 2, 5, 'some text'),
  (3, 1, 3, 4, 'some text');