DROP DATABASE IF EXISTS swif_db;

CREATE DATABASE swif_db;

\c swif_db
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS messages;
-- DROP TABLE IF EXISTS subjects;
-- DROP TABLE IF EXISTS study_sessions;
-- DROP TABLE IF EXISTS connections;
-- DROP TABLE IF EXISTS user_subjects;


CREATE TABLE users (
  username TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  password_hash VARCHAR(255) NOT NULL,
  gender TEXT,
  age INTEGER,
  country TEXT,
  city TEXT,
  profile_image_url TEXT,
  bio TEXT,
  contact_info TEXT,
  subject_interest INTEGER
);

CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  sender_username TEXT REFERENCES users(username),
  recipient_username TEXT REFERENCES users(username),
  message_content TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subjects (
  subject_id SERIAL PRIMARY KEY,
  subject_name TEXT,
  image_url TEXT,
  description TEXT
);


CREATE TABLE user_subject_connections (
  user_id TEXT REFERENCES users(username),
  subject_id INTEGER REFERENCES subjects(subject_id),
  PRIMARY KEY (user_id, subject_id)
);

