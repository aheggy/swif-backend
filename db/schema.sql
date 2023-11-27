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
  subject_interest TEXT
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
  description TEXT
  );
  

  
  /*
  
  CREATE TABLE study_sessions (
  session_id SERIAL PRIMARY KEY,
  user1_id INTEGER REFERENCES users(id),
  user2_id INTEGER REFERENCES users(id),
  subject_id INTEGER REFERENCES subjects(subject_id),
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  status TEXT
  );
  
  
  CREATE TABLE connections (
  id SERIAL PRIMARY KEY,
  user1_id INTEGER REFERENCES users(id),
  user2_id INTEGER REFERENCES users(id),
  status TEXT 
  );
  
  
  CREATE TABLE user_subjects (
  user_subject_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  subject_id INTEGER REFERENCES subjects(subject_id)
  );
  
   */
  -- DROP TABLE IF EXISTS groups;
  -- DROP TABLE IF EXISTS participants;
  -- CREATE TABLE groups (
  --     id SERIAL PRIMARY KEY,
  --     description TEXT
  --     subject_id INTEGER REFERENCES subjects(id)
  -- ); 
  -- CREATE TABLE participants (
  --     id SERIAL PRIMARY KEY,
  --     user_id INTEGER REFERENCES users(id),
  --     group_id INTEGER REFERENCES groups(id)
  -- );