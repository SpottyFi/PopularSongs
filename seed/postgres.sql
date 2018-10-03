CREATE DATABASE spottyfi;

-- ARTISTS TABLE --
CREATE TABLE IF NOT EXISTS artists(
	id INT NOT NULL,
	name VARCHAR(255),
	PRIMARY KEY(id)
);

-- ALBUMS TABLE --
CREATE TABLE IF NOT EXISTS albums(
	id INT NOT NULL,
	name VARCHAR(255),
	image VARCHAR(255),
	year VARCHAR(255),
	artist_id INT NOT NULL REFERENCES artists(id),
	PRIMARY KEY(id)
);

-- SONGS TABLE --
CREATE TABLE IF NOT EXISTS songs(
	id INT NOT NULL,
	name VARCHAR(255),
	streams INT,
	length INT,
	popularity INT, 
	album_id INT NOT NULL REFERENCES albums(id),
	PRIMARY KEY(id)
);