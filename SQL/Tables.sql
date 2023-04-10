create schema zoo;
use zoo;

CREATE TABLE animal (
    aid           VARCHAR(20) NOT NULL,
    name          VARCHAR(100),
    specie        VARCHAR(50),
    date_of_birth DATE,
    weight        DECIMAL(10, 2),
    habitat       VARCHAR(20) NOT NULL,
    CONSTRAINT positive_weight CHECK ( weight > 0 ),
    CONSTRAINT animal_pk PRIMARY KEY ( aid )
);

CREATE TABLE caretaker (
    sssn      CHAR(10) NOT NULL,
    specialty VARCHAR(100),
    CONSTRAINT caretaker_pk PRIMARY KEY ( sssn )
);

CREATE TABLE event (
    name              VARCHAR(100) NOT NULL,
    date              DATE NOT NULL,
    location          VARCHAR(100) NOT NULL,
    event_manager_ssn CHAR(10) NOT NULL,
    CONSTRAINT event_pk PRIMARY KEY ( name, date, location )
);

CREATE TABLE event_manager (
    sssn CHAR(10) NOT NULL,
    CONSTRAINT event_manager_pk PRIMARY KEY ( sssn )
);

CREATE TABLE guide (
    sssn CHAR(10) NOT NULL,
    CONSTRAINT guide_pk PRIMARY KEY ( sssn )
);

CREATE TABLE habitat (
    hid         VARCHAR(20) NOT NULL,
    name        VARCHAR(100),
    capacity    DECIMAL(10, 2),
    type        VARCHAR(50),
    size        DECIMAL(10, 2),
    description VARCHAR(200),
    CONSTRAINT habitat_capacity CHECK ( capacity > 0 ),
    CONSTRAINT habitat_size CHECK ( size > 0 ),
    CONSTRAINT habitat_pk PRIMARY KEY ( hid )
);

CREATE TABLE janitor (
    sssn CHAR(10) NOT NULL,
    CONSTRAINT janitor_pk PRIMARY KEY ( sssn )
);

CREATE TABLE janitor_habitat (
    jssn CHAR(10) NOT NULL,
    hid  VARCHAR(20) NOT NULL,
    CONSTRAINT janitor_habitat_pk PRIMARY KEY ( jssn, hid )
);

CREATE TABLE language (
    gssn     CHAR(10) NOT NULL,
    language VARCHAR(10) NOT NULL,
    CONSTRAINT languages_pk PRIMARY KEY ( gssn, language )
);

CREATE TABLE participate (
    name     VARCHAR(100) NOT NULL,
    date     DATE NOT NULL,
    location VARCHAR(100) NOT NULL,
    sssn     CHAR(10) NOT NULL,
    CONSTRAINT participate_pk PRIMARY KEY ( name, date, location, sssn )
);

CREATE TABLE receptionist (
    sssn CHAR(10) NOT NULL,
    CONSTRAINT receptionist_pk PRIMARY KEY ( sssn )
);

CREATE TABLE staff_member (
    ssn           CHAR(10) NOT NULL,
    date_of_birth DATE,
    first_name    VARCHAR(50) NOT NULL,
    last_name     VARCHAR(50) NOT NULL,
    sex           CHAR(1),
    phone_number  VARCHAR(20) NOT NULL,
    email         VARCHAR(100) NOT NULL,
    address       VARCHAR(200),
    isvolunteer   CHAR(1) DEFAULT 'N',
    isparttime    CHAR(1) DEFAULT 'N',
    isfulltime    CHAR(1) DEFAULT 'N',
    payperhour    DECIMAL(10, 2),
    paypermonth    DECIMAL(10, 2),
    CONSTRAINT staff_member_sex CHECK ( sex IN ( 'F', 'M' ) ),
    CONSTRAINT is_phone_number CHECK ( phone_number REGEXP '^[0-9]{3}-[0-9]{3}-[0-9]{4}$' ),
    CONSTRAINT is_email CHECK ( email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$' ),
    CONSTRAINT staff_member_isvolunteer CHECK ( isvolunteer IN ( 'N', 'Y' ) ),
	CONSTRAINT staff_member_isparttime CHECK ( isparttime IN ( 'N', 'Y' ) ),
	CONSTRAINT staff_member_isfulltime CHECK ( isfulltime IN ( 'N', 'Y' ) ),
	CONSTRAINT staff_member_payperhour CHECK ( payperhour > 0 ),
    CONSTRAINT staff_member_paypermonth CHECK ( paypermonth > 0 ),
	CONSTRAINT staff_member_pk PRIMARY KEY ( ssn )
);

CREATE TABLE take_care (
caretaker_ssn CHAR(10) NOT NULL,
animal_id VARCHAR(20) NOT NULL,
CONSTRAINT take_care_pk PRIMARY KEY ( caretaker_ssn, animal_id )
);

CREATE TABLE ticket (
tid VARCHAR(20) NOT NULL,
price DECIMAL(10, 2),
type VARCHAR(50),
date_of_issuing DATE,
recep_ssn CHAR(10) NOT NULL,
guide_ssn CHAR(10) NOT NULL,
CONSTRAINT ticket_price CHECK ( price > 0 ),
CONSTRAINT ticket_type CHECK ( type IN ( 'Membership', 'Regular', 'VIP' ) ),
CONSTRAINT ticket_pk PRIMARY KEY ( tid )
);

ALTER TABLE animal
ADD CONSTRAINT animal_habitat_fk FOREIGN KEY ( habitat )
REFERENCES habitat ( hid ) ON UPDATE CASCADE;

ALTER TABLE caretaker
ADD CONSTRAINT caretaker_staff_member_fk FOREIGN KEY ( sssn )
REFERENCES staff_member ( ssn ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE event
ADD CONSTRAINT event_event_manager_fk FOREIGN KEY ( event_manager_ssn )
REFERENCES event_manager ( sssn ) ON UPDATE CASCADE;

ALTER TABLE event_manager
ADD CONSTRAINT event_manager_staff_member_fk FOREIGN KEY ( sssn )
REFERENCES staff_member ( ssn ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE guide
ADD CONSTRAINT guide_staff_member_fk FOREIGN KEY ( sssn )
REFERENCES staff_member ( ssn ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE janitor_habitat
ADD CONSTRAINT janitor_habitat_habitat_fk FOREIGN KEY ( hid )
REFERENCES habitat ( hid ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE janitor_habitat
ADD CONSTRAINT janitor_habitat_janitor_fk FOREIGN KEY ( jssn )
REFERENCES janitor ( sssn ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE janitor
ADD CONSTRAINT janitor_staff_member_fk FOREIGN KEY ( sssn )
REFERENCES staff_member ( ssn ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE language
ADD CONSTRAINT language_guide_fk FOREIGN KEY ( gssn )
REFERENCES guide ( sssn ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE participate
ADD CONSTRAINT participate_event_fk FOREIGN KEY ( name, date, location )
REFERENCES event ( name, date, location ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE participate
ADD CONSTRAINT participate_staff_member_fk FOREIGN KEY ( sssn )
REFERENCES staff_member ( ssn )ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE receptionist
ADD CONSTRAINT receptionist_staff_member_fk FOREIGN KEY ( sssn )
REFERENCES staff_member ( ssn ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE take_care
ADD CONSTRAINT take_care_animal_fk FOREIGN KEY ( animal_id )
REFERENCES animal ( aid )ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE take_care
ADD CONSTRAINT take_care_caretaker_fk FOREIGN KEY ( caretaker_ssn )
REFERENCES caretaker ( sssn ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ticket
ADD CONSTRAINT ticket_guide_fk FOREIGN KEY ( guide_ssn )
REFERENCES guide ( sssn )ON UPDATE CASCADE;

ALTER TABLE ticket
ADD CONSTRAINT ticket_receptionist_fk FOREIGN KEY ( recep_ssn )
REFERENCES receptionist ( sssn ) ON UPDATE CASCADE;