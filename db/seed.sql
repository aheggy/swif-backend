-- \c swif_db


UPDATE subjects 
SET 
    icon_url = 'https://cdn.britannica.com/99/152199-138-4BB47843/genetics-James-Watson-study-Francis-Crick-structure.jpg?w=800&h=450&c=crop'
WHERE 
    subject_name = 'Genetics';






--     ('Jessica', 'Drew', 'atelegs', 'jdrew@swifmail.com', 'Female', 25, 'UK', 'London', 'https://drive.google.com/file/d/1XSAX5uW-1gMHp18nb1KEhzh86lyZ9eTJ/view?usp=drive_link', 'Extremely passionate about web development.', '917-123-4567', 'Python'),

--     ('Doreen', 'Green', 'hatehawks', 'bushytail@swifmail.com', 'Female', 30, 'USA', 'Los Angeles', 'https://drive.google.com/file/d/1vjufJmp86gPSOEkH0OlXBGQmgxjR6fk9/view?usp=drive_link', 'Loves outdoor activities, but not a fan of rosemary.', '347-123-4567', 'Javascript'),

--     ('David', 'Lee', 'davidlee', 'davidlee@swifmail.com', 'Male', 28, 'Australia', 'Sydney', 'https://drive.google.com/file/d/1Sz-IFbh3Kao7vlB-UWgi5WZLhqNZdWsH/view?usp=drive_link', 'Coffee addict and software engineer.', '212-123-4567', 'Javascript'),

--     ('Emily', 'Wilson', 'emilywilson', 'emilywilson@swifmail.com', 'Queer', 22, 'Canada', 'Vancouver', 'https://drive.google.com/file/d/1siLuXDxbFblGYCNPfEcgP_Xjc9yVzaTW/view?usp=drive_link', 'Travel enthusiast and foodie.', '609-123-4567', 'Python'),

--     ('Frank', 'Davis', 'frankdavis', 'frankdavis@swifmail.com', 'Male', 32, 'USA', 'Los Angeles', 'https://drive.google.com/file/d/1xQeC3eVPJlG06o_heaqPf5lQQl6Uq-Pz/view?usp=drive_link', 'Movie buff and tech geek.', '718-123-4567', 'Zoology'),

--     ('Grace', 'Miller', 'gracemiller', 'gracemiller@swifmail.com', 'Female', 29, 'UK', 'Manchester', 'https://drive.google.com/file/d/1uq6NfgVYxKGyOtvmQrNRkpXN7cy7F-xO/view?usp=drive_link', 'Art lover and aspiring painter.', '732-123-4567', 'Kinesiology'),

--     ('Henry', 'Garcia', 'henrygarcia', 'henrygarcia@swifmail.com', 'Transgender', 27, 'Spain', 'Madrid', 'https://drive.google.com/file/d/1ZuMRAGH-fEB5kbLkj_MXy8r00dVYwhIi/view?usp=drive_link', 'Soccer fan and fitness enthusiast.', '716-123-4567', 'Robotics'),

--     ('Mark', 'Bergwhal', 'nopenothim', 'bergwhal@swifmail.com', 'Non-binary', 22, 'USA', 'New York City', 'https://drive.google.com/file/d/1toA2xPFy7rhfOdfuqqwFLyp7LKIb9Bkn/view?usp=drive_link', 'BLANKing.', '213-123-4567', 'Immunology'),

--     ('Isabel', 'Martinez', 'isabelmartinez', 'isabelmartinez@swifmail.com', 'Non-binary', 24, 'Mexico', 'Mexico City', 'https://drive.google.com/file/d/1yDvCI7niO7Z3JQOAG7F0l4hr-hBygLsN/view?usp=drive_link', 'Nature lover and environmental activist.', '416-123-4567', 'Environmentalism');


INSERT INTO subjects (subject_name, description) VALUES 
    ('Calculus_1', 'Description of Calculus_1 subject'),
    ('Algebra', 'Description of Algebra subject'),
    ('Data_Structures', 'Description of Data Structures subject'),
    ('Algorithms', 'Description of Algorithms subject'),
    ('Computer_Networks', 'Description of Computer Networks subject'),
    ('Cybersecurity', 'Description of Cybersecurity subject'),
    ('Ecology', 'Description of Ecology subject'),
    ('Genetics', 'Description of Genetics subject'),
    ('Artificial_Intelligence', 'Description of Artificial Intelligence subject'),
    ('Biochemistry', 'Description of Biochemistry subject');


-- INSERT INTO study_sessions (user1_id, user2_id, subject_id, start_time, end_time, status)
-- VALUES 
--     (1, 2, 1, '2023-10-30 10:00:00', '2023-10-30 12:00:00', 'Scheduled'),
--     (3, 4, 2, '2023-11-01 14:00:00', '2023-11-01 16:00:00', 'In Progress');


INSERT INTO messages (sender_id, receiver_id, message_content, timestamp)
VALUES  (1, 2, 'Hello, how are you?', '2023-10-26 15:30:00'),
        (2, 1, "I'm fine, Thank you", '2023-10-26 15:31:00');

INSERT INTO users (username, first_name, last_name, password_hash, profile_image_url)
VALUES  ('justinle', 'Justin', 'Le', 'password_hash', 'https://media.licdn.com/dms/image/C4D03AQE_j4RXSeNYSg/profile-displayphoto-shrink_800_800/0/1629669388996?e=2147483647&v=beta&t=H-O0N-JYkFdUxdAPwydPq-4uE5Sp4NQ8bzra5gV4XIs'),
        -- ('wadew', 'Wade', 'Wilson', 'password_hash', 'https://i.pinimg.com/736x/e4/d2/94/e4d294355ed8a3ff324b92364cfb83fb.jpg'),
        -- ('ahmadpursuit', 'Ahmad', 'Hamoudeh', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U040W2R5F7H-d15f0cb59cb9-512'),
        -- ('allahvel', 'Allahvel', 'Salisbury', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04D65CLQGK-74301412e3f5-512'),
        -- ('adrian', 'Adrian', 'Burke', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04181BU33R-ff417279bac6-512'),
        -- ('alejandra', 'Alejandra', 'Ramirez', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04D8N3H85S-7e2197dc6a46-512'),
        -- ('angie', 'Angie', 'Diaz', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U03D204QYTT-4be780e5eb2e-512'),
        -- ('agoodman', 'Ahmad', 'Goodman', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04DJT569U1-cbeefed14017-512'),
        -- ('angel', 'Angel', 'Tirado', 'password_hash', 'https://media.licdn.com/dms/image/D4E03AQGaXzxMZJ9ivQ/profile-displayphoto-shrink_400_400/0/1682540173299?e=2147483647&v=beta&t=IXiwDrc6O-j8qSitjfQ5yoW5u8tyXtvm4Sj-h8ITPzI'),
        -- ('arius', 'Arius', 'Phillips', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U041NEZG18B-2e5378cf282d-512'),
        -- ('blanca', 'Blanca', 'Altamirano', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U03CPAZMM5Y-522df46f1f53-512'),
        -- ('berlin', 'Berlin', 'Rivas', 'password_hash', 'https://assets-prd.ignimgs.com/2023/06/14/keaton-smile-thumb-1686703104545.jpg'),
        -- ('christian', 'Christian', 'Valle', 'password_hash', 'https://media.licdn.com/dms/image/D4E03AQEw1Cg2QZbDHA/profile-displayphoto-shrink_800_800/0/1680041643553?e=2147483647&v=beta&t=i2-nhADfKbdnLf42BYhrEuf0MLVruuiwamyaXm9-kww'),
        -- ('davonte', 'Davonte', 'Williams', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U0341170AJ2-d5bfc0b3c5e8-512'),
        -- ('dennys', 'Dennys', 'Antunish', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04D65DEY59-e1e2a4fce1b9-512'),
        -- ('frantz', 'Frantz-Sebastien', 'Mathias', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04DJT503S5-dfa08b995854-512'),
        -- ('irwin', 'Irwin', 'Jorge', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04DJT6DW3B-504952daa222-512'),
        -- ('jennifer', 'Jennifer', 'Einstein', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U042C85DNL8-0570b4606546-512'),
        -- ('jerry', 'Jerry', 'John', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04D65E7ZKM-c20a36075f61-512'),
        -- ('joanavel', 'Joanavel', 'Pascual', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04DJT75HC1-73307a1a5ffc-512'),
        -- ('john', 'John', 'Goodman', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04BRUZ4Q4T-b97dad5ae9c8-512'),
        -- ('judy', 'Judy', 'Chue', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04DJT4QA7K-1e14e4cf5e31-512'),
        -- ('justin', 'Justin', 'Knolley', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04CZL7DB2A-1454557492b7-512'),
        -- ('kinu', 'Kinu', 'Wright', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U042C9AEVCY-38b775eeebe8-512'),
        -- ('leliah', 'Leliah', 'Spruill', 'password_hash', 'https://avatars.githubusercontent.com/u/115671548?v=4'),
        -- ('matt', 'Matt', 'Patrick', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U03EJGMS9E0-a6a405377443-512'),
        -- ('monir', 'Monir', 'Hossen', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04D65D2XT5-0dc923444d64-512'),
        -- ('noni', 'Noni', 'Porter', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04DJT704N5-c3f8a5fd5f98-512'),
        -- ('paola', 'Paola', 'Aracena', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U041NDW1HB5-535829b32345-512'),
        -- ('phillip', 'Phillip', 'Mitchell', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04DVUY5RU0-ed78ef7ca917-512'),
        -- ('rachel', 'Rachel', 'Feldman', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04HRJSHLG4-67f2f7f5c306-512'),
        -- ('kenti', 'Kenti', 'Johnson', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04D39XU6S1-a8f9d11a8616-512'),
        -- ('ridwan', 'Ridwan', 'Robin', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04D39YSWQM-eecc332836a3-512'),
        -- ('sabri', 'Sabri', 'Mohiuddin', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04CZL78HUN-fe7f5182bddc-512'),
        -- ('sarai', 'Sarai', 'Thomas', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04DVV35NHE-27255bc90aae-512'),
        -- ('silis', 'Silis', 'Kleemoff', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04CZL9N0VC-1dea6972bf6c-512'),
        -- ('tshering', 'Tshering', 'Gurung', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U04CZL7V4G6-10acbf913b21-512'),
        -- ('wai', 'Wai Leong', 'Chong', 'password_hash', 'https://avatars.githubusercontent.com/u/119991668?v=4'),
        -- ('alexis', 'Alexis', 'Medina', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-UJVLAMCSZ-ab6972cfdccf-512'),
        -- ('caroline', 'Caroline', 'Kang', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-UD36LCUUR-98e47289c3b8-512'),
        -- ('jordan', 'Jordan', 'Manley', 'password_hash', 'https://www.pursuit.org/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Flzh86kzt%2Fproduction%2Ff2266bcf213c344acff9536a22e2f352a1d7aeb1-500x500.jpg%3Fw%3D500%26h%3D500%26q%3D80%26fit%3Dmax%26auto%3Dformat&w=256&q=80'),
        -- ('rachelliang', 'Rachel', 'Liang', 'password_hash', 'https://www.pursuit.org/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Flzh86kzt%2Fproduction%2Fdba422a4d6656fb6a18bae7d6145a7af39e1b265-750x1000.jpg%3Fw%3D750%26h%3D1000%26q%3D80%26fit%3Dmax%26auto%3Dformat&w=256&q=80'),
        -- ('raquel', 'Raquel', 'Martinez', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-UV21D4BAB-8a66ef288943-512'),
        -- ('carolineoh', 'Caroline', 'Oh', 'password_hash', 'https://ca.slack-edge.com/TCVA3PF24-U013CTY5U30-e73c5e979af6-512'),
        -- ('gavin', 'Gavin', 'Belson', 'password_hash', 'https://media.licdn.com/dms/image/C4E03AQHLQspJe94Hdw/profile-displayphoto-shrink_800_800/0/1550111976736?e=2147483647&v=beta&t=A8FSdiUGOSj3vcv6GNiN5ptc_4xVOD8e6kerw7RDUZA'),
        -- ('jared', 'Jared Donald', 'Dunn', 'password_hash', 'https://i.ytimg.com/vi/tdbYsEbHOSg/mqdefault.jpg'),
        -- ('tom', 'Tom', 'Anderson', 'password_hash', 'https://pbs.twimg.com/profile_images/1237550450/mstom_400x400.jpg'),
        -- ('', '', '', 'password_hash', ''),
        -- ('', '', '', 'password_hash', ''),
        -- ('', '', '', 'password_hash', ''),
        -- ('', '', '', 'password_hash', ''),
        -- ('', '', '', 'password_hash', ''),
        -- ('', '', '', 'password_hash', ''),
        -- ('', '', '', 'password_hash', ''),
        -- ('', '', '', 'password_hash', ''),
        -- ('', '', '', 'password_hash', ''),
        -- ('', '', '', 'password_hash', ''),
        -- ('', '', '', 'password_hash', ''),
        -- ('', '', '', 'password_hash', ''),
        -- ('', '', '', 'password_hash', ''),
        ('aekta', 'Aekta', 'Shah', 'password_hash', 'https://media.licdn.com/dms/image/D5603AQFUkRgu2s2FeQ/profile-displayphoto-shrink_400_400/0/1632844599818?e=2147483647&v=beta&t=QjJn2Um6scz5qVQiK0CX5OfGsam8FM3_TBn6lnsVkYI');