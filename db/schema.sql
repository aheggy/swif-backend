DROP DATABASE IF EXISTS swif_db;
CREATE DATABASE swif_db;

\c swif_db

-- DROP TABLE IF EXISTS user;

CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 first_name TEXT,
 last_name TEXT,
 username TEXT,
 email TEXT,
 gender TEXT,
 age INTEGER,
country TEXT,
city TEXT,
profile_image_url TEXT,
bio TEXT,
contact_info TEXT,
subject_interest TEXT
);
