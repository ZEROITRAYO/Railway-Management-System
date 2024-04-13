CREATE TABLE city (
  city_name varchar(50) NOT NULL,
  state varchar(50) DEFAULT NULL,
  PRIMARY KEY (city_name)
) ;


CREATE TABLE department (
  dept_no int NOT NULL,
  department varchar(50) DEFAULT NULL,
  PRIMARY KEY (dept_no)
)


CREATE TABLE emp_login (
  emp_id varchar(5) NOT NULL,
  emp_email varchar(50) DEFAULT NULL,
  emp_passwd varchar(50) DEFAULT NULL,
  PRIMARY KEY (emp_id)
)


CREATE TABLE jobs (
  job_type varchar(100) NOT NULL,
  dept_no int DEFAULT NULL,
  salary int DEFAULT NULL,
  PRIMARY KEY (job_type),
  KEY dept_no (dept_no),
  CONSTRAINT jobs_ibfk_1 FOREIGN KEY (dept_no) REFERENCES department (dept_no)
)


CREATE TABLE railway_station (
  city_name varchar(50) DEFAULT NULL,
  station_code varchar(5) NOT NULL,
  station_name varchar(100) DEFAULT NULL,
  platform int DEFAULT '5',
  PRIMARY KEY (station_code),
  KEY city_name (city_name),
  CONSTRAINT railway_station_ibfk_1 FOREIGN KEY (city_name) REFERENCES city (city_name)
)


CREATE TABLE employee (
  emp_id varchar(5) NOT NULL,
  emp_first_name varchar(50) DEFAULT NULL,
  emp_last_name varchar(50) DEFAULT NULL,
  aadharid varchar(12) DEFAULT NULL,
  station_code varchar(5) DEFAULT NULL,
  emp_phone varchar(10) DEFAULT NULL,
  emp_email varchar(50) DEFAULT NULL,
  gender char(1) DEFAULT NULL,
  emp_dob date DEFAULT NULL,
  job_type varchar(100) DEFAULT NULL,
  PRIMARY KEY (emp_id),
  KEY job_type (job_type),
  KEY station_code (station_code),
  CONSTRAINT employee_ibfk_1 FOREIGN KEY (emp_id) REFERENCES emp_login (emp_id),
  CONSTRAINT employee_ibfk_2 FOREIGN KEY (job_type) REFERENCES jobs (job_type),
  CONSTRAINT employee_ibfk_3 FOREIGN KEY (station_code) REFERENCES railway_station (station_code)
)


CREATE TABLE train (
  train_id varchar(6) NOT NULL,
  train_name varchar(100) DEFAULT NULL,
  distance int DEFAULT NULL,
  no_of_stops int DEFAULT NULL,
  PRIMARY KEY (train_id)
)


CREATE TABLE train_tt (
  train_id varchar(6) NOT NULL,
  origin varchar(50) NOT NULL,
  destination varchar(50) NOT NULL,
  arrival time DEFAULT NULL,
  departure time DEFAULT NULL,
  platform int DEFAULT NULL,
  date_of_journey date NOT NULL,
  PRIMARY KEY (train_id,date_of_journey,origin,destination),
  CONSTRAINT train_tt_ibfk_1 FOREIGN KEY (train_id) REFERENCES train (train_id)
);


CREATE TABLE train_delayed (
  train_id varchar(6) NOT NULL,
  date_of_journey date NOT NULL,
  arrival time DEFAULT NULL,
  arrival_delayed int DEFAULT NULL,
  departure time DEFAULT NULL,
  departure_delayed int DEFAULT NULL,
  date_changed date NOT NULL,
  time_changed time NOT NULL,
  origin varchar(50) NOT NULL,
  destination varchar(50) NOT NULL,
  PRIMARY KEY (train_id,date_of_journey,date_changed,time_changed,origin,destination),
  CONSTRAINT train_delayed_ibfk_1 FOREIGN KEY (train_id, date_of_journey,origin,destination) REFERENCES train_tt (train_id, date_of_journey,origin,destination)
);


CREATE TABLE user_login (
  email varchar(50) NOT NULL,
  passwd varchar(50) DEFAULT NULL,
  first_name varchar(50) DEFAULT NULL,
  last_name varchar(50) DEFAULT NULL,
  PRIMARY KEY (email)
);


CREATE TABLE user_profile (
  email varchar(50) NOT NULL,
  first_name varchar(50) DEFAULT NULL,
  last_name varchar(50) DEFAULT NULL,
  dob date DEFAULT NULL,
  gender char(1) DEFAULT NULL,
  contact varchar(10) DEFAULT NULL,
  aadhar_ID varchar(12) DEFAULT NULL,
  money int DEFAULT NULL,
  PRIMARY KEY (email),
  CONSTRAINT user_profile_ibfk_1 FOREIGN KEY (email) REFERENCES user_login (email)
);


CREATE TABLE seats (
  train_id varchar(6) NOT NULL,
  class_name varchar(2) NOT NULL,
  fare int DEFAULT NULL,
  total_seats int DEFAULT '25',
  PRIMARY KEY (train_id,class_name),
  CONSTRAINT seats_ibfk_1 FOREIGN KEY (train_id) REFERENCES train (train_id),
);


CREATE TABLE bookings (
  ticket_no int NOT NULL,
  train_id varchar(6) DEFAULT NULL,
  class_name varchar(2) DEFAULT NULL,
  seat_no int DEFAULT NULL,
  origin varchar(50) DEFAULT NULL,
  destination varchar(50) DEFAULT NULL,
  date_of_journey date DEFAULT NULL,
  booking_date date DEFAULT NULL,
  email varchar(50) DEFAULT NULL,
  fare int DEFAULT NULL,
  status char(1) DEFAULT 'B',
  PRIMARY KEY (ticket_no),
  KEY train_id (train_id,class_name),
  KEY email (email),
  CONSTRAINT bookings_ibfk_1 FOREIGN KEY (train_id, class_name) REFERENCES seats (train_id, class_name),
  CONSTRAINT bookings_ibfk_2 FOREIGN KEY (email) REFERENCES user_profile (email)
);


CREATE TABLE cancellation (
  ticket_no int NOT NULL,
  cancellation_date date DEFAULT NULL,
  charges int DEFAULT NULL,
  PRIMARY KEY (ticket_no),
  CONSTRAINT cancellation_ibfk_1 FOREIGN KEY (ticket_no) REFERENCES bookings (ticket_no)
);


CREATE TABLE confirmed_seats (
  train_id varchar(6) NOT NULL,
  class_name varchar(2) NOT NULL,
  seat_no int NOT NULL,
  date_of_journey date NOT NULL,
  PRIMARY KEY (train_id,class_name,seat_no,date_of_journey),
  CONSTRAINT confirmed_seats_ibfk_1 FOREIGN KEY (train_id, class_name) REFERENCES seats (train_id, class_name)
);


CREATE TABLE fare_history (
  train_id varchar(6) NOT NULL,
  class_name varchar(2) NOT NULL,
  old_fare int DEFAULT NULL,
  new_fare int DEFAULT NULL,
  price_change_date date NOT NULL,
  price_change_time time NOT NULL,
  PRIMARY KEY (train_id,class_name,price_change_date,price_change_time),
  CONSTRAINT fare_history_ibfk_1 FOREIGN KEY (train_id, class_name) REFERENCES seats (train_id, class_name)
);


CREATE TABLE passenger (
  ticket_no int NOT NULL,
  pass_first_name varchar(50) DEFAULT NULL,
  pass_last_name varchar(50) DEFAULT NULL,
  train_id varchar(6) DEFAULT NULL,
  class_name varchar(2) DEFAULT NULL,
  gender char(1) DEFAULT NULL,
  age int DEFAULT NULL,
  contact varchar(10) DEFAULT NULL,
  aadhar_ID varchar(12) NOT NULL,
  PRIMARY KEY (ticket_no,aadhar_ID),
  KEY train_id (train_id,class_name),
  CONSTRAINT passenger_ibfk_1 FOREIGN KEY (ticket_no) REFERENCES bookings (ticket_no),
  CONSTRAINT passenger_ibfk_2 FOREIGN KEY (train_id, class_name) REFERENCES seats (train_id, class_name)
);


CREATE TABLE stops (
  train_id varchar(6) NOT NULL,
  stop_1 varchar(5) DEFAULT NULL,
  stop_2 varchar(5) DEFAULT NULL,
  stop_3 varchar(5) DEFAULT NULL,
  PRIMARY KEY (train_id),
  CONSTRAINT stops_ibfk_1 FOREIGN KEY (train_id) REFERENCES train (train_id)
);



ALTER TABLE train_tt
ADD INDEX origin_destination_index (origin, destination);