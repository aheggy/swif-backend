-- \c swif_db

-- INSERT INTO users (first_name, last_name, username, email, gender, age, country, city, profile_image_url, bio, contact_info, subject_interest)
-- VALUES
--     ('Marc', 'Spector', 'sunbishop', 'marcspector@swifmail.com', 'Male', 21, 'USA', 'Chicago', 'https://drive.google.com/file/d/1PmtAQULVpV0P8DOXxfG2NtSiTcE0aRJ6/view?usp=drive_link', 'Scared of snakes, but trying to learn Python.', '646-123-4567', 'Python'),

--     ('Jessica', 'Drew', 'atelegs', 'jdrew@swifmail.com', 'Female', 25, 'UK', 'London', 'https://drive.google.com/file/d/1XSAX5uW-1gMHp18nb1KEhzh86lyZ9eTJ/view?usp=drive_link', 'Extremely passionate about web development.', '917-123-4567', 'Python'),

--     ('Doreen', 'Green', 'hatehawks', 'bushytail@swifmail.com', 'Female', 30, 'USA', 'Los Angeles', 'https://drive.google.com/file/d/1vjufJmp86gPSOEkH0OlXBGQmgxjR6fk9/view?usp=drive_link', 'Loves outdoor activities, but not a fan of rosemary.', '347-123-4567', 'Javascript'),

--     ('David', 'Lee', 'davidlee', 'davidlee@swifmail.com', 'Male', 28, 'Australia', 'Sydney', 'https://drive.google.com/file/d/1Sz-IFbh3Kao7vlB-UWgi5WZLhqNZdWsH/view?usp=drive_link', 'Coffee addict and software engineer.', '212-123-4567', 'Javascript'),

--     ('Emily', 'Wilson', 'emilywilson', 'emilywilson@swifmail.com', 'Queer', 22, 'Canada', 'Vancouver', 'https://drive.google.com/file/d/1siLuXDxbFblGYCNPfEcgP_Xjc9yVzaTW/view?usp=drive_link', 'Travel enthusiast and foodie.', '609-123-4567', 'Python'),

--     ('Frank', 'Davis', 'frankdavis', 'frankdavis@swifmail.com', 'Male', 32, 'USA', 'Los Angeles', 'https://drive.google.com/file/d/1xQeC3eVPJlG06o_heaqPf5lQQl6Uq-Pz/view?usp=drive_link', 'Movie buff and tech geek.', '718-123-4567', 'Zoology'),

--     ('Grace', 'Miller', 'gracemiller', 'gracemiller@swifmail.com', 'Female', 29, 'UK', 'Manchester', 'https://drive.google.com/file/d/1uq6NfgVYxKGyOtvmQrNRkpXN7cy7F-xO/view?usp=drive_link', 'Art lover and aspiring painter.', '732-123-4567', 'Kinesiology'),

--     ('Henry', 'Garcia', 'henrygarcia', 'henrygarcia@swifmail.com', 'Transgender', 27, 'Spain', 'Madrid', 'https://drive.google.com/file/d/1ZuMRAGH-fEB5kbLkj_MXy8r00dVYwhIi/view?usp=drive_link', 'Soccer fan and fitness enthusiast.', '716-123-4567', 'Robotics'),

--     ('Mark', 'Bergwhal', 'nopenothim', 'bergwhal@swifmail.com', 'Non-binary', 22, 'USA', 'New York City', 'https://drive.google.com/file/d/1toA2xPFy7rhfOdfuqqwFLyp7LKIb9Bkn/view?usp=drive_link', 'BLANKing.', '213-123-4567', 'Immunology'),

--     ('Isabel', 'Martinez', 'isabelmartinez', 'isabelmartinez@swifmail.com', 'Non-binary', 24, 'Mexico', 'Mexico City', 'https://drive.google.com/file/d/1yDvCI7niO7Z3JQOAG7F0l4hr-hBygLsN/view?usp=drive_link', 'Nature lover and environmental activist.', '416-123-4567', 'Environmentalism');


-- INSERT INTO subjects (subject_name, description) VALUES 
--     ('Calculus', 'Description of Calculus subject'),
--     ('Algebra', 'Description of Algebra subject'),
--     ('Data Structures', 'Description of Data Structures subject'),
--     ('Algorithms', 'Description of Algorithms subject'),
--     ('Computer Networks', 'Description of Computer Networks subject'),
--     ('Cybersecurity', 'Description of Cybersecurity subject'),
--     ('Ecology', 'Description of Ecology subject'),
--     ('Genetics', 'Description of Genetics subject'),
--     ('Artificial Intelligence', 'Description of Artificial Intelligence subject'),
--     ('Biochemistry', 'Description of Biochemistry subject');


-- INSERT INTO study_sessions (user1_id, user2_id, subject_id, start_time, end_time, status)
-- VALUES 
--     (1, 2, 1, '2023-10-30 10:00:00', '2023-10-30 12:00:00', 'Scheduled'),
--     (3, 4, 2, '2023-11-01 14:00:00', '2023-11-01 16:00:00', 'In Progress');

-- INSERT INTO messages (sender_id, receiver_id, message_content, timestamp)
-- VALUES (1, 2, 'Hello, how are you?', '2023-10-26 15:30:00');