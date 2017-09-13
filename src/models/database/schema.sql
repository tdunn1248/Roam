DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS post CASCADE;

CREATE TABLE member (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  joined TIMESTAMP default current_timestamp,
  city VARCHAR(255)
);

CREATE TABLE city (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE post (
  id BIGSERIAL PRIMARY KEY,
  content TEXT,
  created TIMESTAMP default current_timestamp,
  city_id INT REFERENCES city(id),
  member_id INT REFERENCES member(id)
);

INSERT INTO member VALUES(default, 'thomas', 'thomas@gmail', 'password', default, 'St. Louis')
