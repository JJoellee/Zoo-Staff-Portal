CREATE INDEX idx_staff_member_last_name ON staff_member(last_name);

CREATE INDEX idx_animal_specie ON animal(specie);

CREATE INDEX idx_event_date ON event(date);

CREATE VIEW animal_caretaker_view AS
SELECT
  a.aid,
  a.name AS animal_name,
  a.specie,
  a.date_of_birth,
  a.weight,
  a.habitat,
  sm.first_name AS caretaker_first_name,
  sm.last_name AS caretaker_last_name
FROM animal AS a
JOIN take_care AS tc ON a.aid = tc.animal_id
JOIN staff_member AS sm ON tc.caretaker_ssn = sm.ssn;

CREATE VIEW event_manager_view AS
SELECT
  e.name AS event_name,
  e.date AS event_date,
  e.location,
  sm.first_name AS event_manager_first_name,
  sm.last_name AS event_manager_last_name
FROM event AS e
JOIN staff_member AS sm ON e.event_manager_ssn = sm.ssn;

CREATE VIEW habitat_animal_count_view AS
SELECT
  h.hid,
  h.name AS habitat_name,
  h.capacity,
  h.type,
  h.size,
  h.description,
  COUNT(a.aid) AS animal_count
FROM habitat AS h
LEFT JOIN animal AS a ON h.hid = a.habitat
GROUP BY h.hid;
