-- Insert data into staff_member table
INSERT INTO staff_member (ssn, date_of_birth, first_name, last_name, sex, phone_number, email, address, isvolunteer, isparttime, isfulltime, payperhour, paypermonth)
VALUES ('1234567890', '1980-02-25', 'John', 'Doe', 'M', '555-123-4567', 'john.doe@email.com', '123 Main St', 'N', 'Y', 'N', 20, 1500),
       ('2345678901', '1990-07-15', 'Jane', 'Smith', 'F', '555-987-6543', 'jane.smith@email.com', '456 First St', 'N', 'N', 'Y', 30, 2800),
       ('3456789012', '1975-10-30', 'Mary', 'Johnson', 'F', '555-555-1234', 'mary.johnson@email.com', '789 Second St', 'Y', 'N', 'Y', 25, 2400),
       ('4567890123', '1985-03-18', 'David', 'Brown', 'M', '555-444-1111', 'david.brown@email.com', '987 Third St', 'N', 'Y', 'N', 18, 1300);

-- Insert data into caretaker, event_manager, guide, janitor, receptionist tables
INSERT INTO caretaker (sssn) VALUES ('1234567890'), ('2345678901');
INSERT INTO event_manager (sssn) VALUES ('3456789012');
INSERT INTO guide (sssn) VALUES ('4567890123');
INSERT INTO janitor (sssn) VALUES ('1234567890'), ('2345678901');
INSERT INTO receptionist (sssn) VALUES ('3456789012');

-- Insert data into habitat table
INSERT INTO habitat (hid, name, capacity, type, size, description)
VALUES ('H1', 'Savanna', 100, 'Outdoor', 2500, 'African grasslands environment'),
       ('H2', 'Rainforest', 150, 'Outdoor', 3000, 'Tropical rainforest environment'),
       ('H3', 'Arctic', 50, 'Outdoor', 2000, 'Polar environment with ice and snow');

-- Insert data into animal table
INSERT INTO animal (aid, name, specie, date_of_birth, weight, habitat)
VALUES ('A1', 'Leo', 'Lion', '2010-07-01', 420.00, 'H1'),
       ('A2', 'Zara', 'Zebra', '2015-09-20', 350.00, 'H1'),
       ('A3', 'Mia', 'Monkey', '2018-03-15', 30.00, 'H2'),
       ('A4', 'Oscar', 'Orangutan', '2016-11-02', 100.00, 'H2'),
       ('A5', 'Penny', 'Penguin', '2019-12-25', 15.00, 'H3');
       
-- Insert data into take_care table
INSERT INTO take_care (caretaker_ssn, animal_id)
VALUES ('1234567890', 'A1'), ('1234567890', 'A2'), ('2345678901', 'A3'), ('2345678901', 'A4'), ('2345678901', 'A5');

-- Insert data into event table
INSERT INTO event (name, date, location, event_manager_ssn)
VALUES ('Zoo Birthday Party', '2023-04-20', 'Party Area 1', '3456789012'),
       ('Wildlife Education', '2023-05-05', 'Education Center', '3456789012'),
       ('Conservation Talk', '2023-06-10', 'Auditorium', '3456789012');

-- Insert data into participate table
INSERT INTO participate (name, date, location, sssn)
VALUES ('Zoo Birthday Party', '2023-04-20', 'Party Area 1', '4567890123'),
       ('Wildlife Education', '2023-05-05', 'Education Center', '4567890123'),
       ('Conservation Talk', '2023-06-10', 'Auditorium', '4567890123');

-- Insert data into janitor_habitat table
INSERT INTO janitor_habitat (jssn, hid)
VALUES ('1234567890', 'H1'), ('1234567890', 'H2'), ('2345678901', 'H3');

-- Insert data into language table
INSERT INTO language (gssn, language)
VALUES ('4567890123', 'English'), ('4567890123', 'Spanish'), ('4567890123', 'French');

-- Insert data into ticket table
INSERT INTO ticket (tid, price, type, date_of_issuing, recep_ssn, guide_ssn)
VALUES ('T1', 15.00, 'Regular', '2023-04-01', '3456789012', '4567890123'),
       ('T2', 50.00, 'VIP', '2023-04-05', '3456789012', '4567890123'),
       ('T3', 100.00, 'Membership', '2023-04-10', '3456789012', '4567890123');