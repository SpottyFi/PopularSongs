CREATE KEYSPACE IF NOT EXISTS spottyfi with REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};
CREATE TABLE spottyfi.artists (
 artist_id int,
 album_id int,
 song_id int,
 artist_name text,
 album_name text,
 album_image text,
 published_year int,
 song_name text,
 song_streams int,
 song_length int,
 song_popularity int,
 PRIMARY KEY (artist_id, album_id, song_popularity)
);

USE spottyfi;

COPY artists(artist_id, album_id, song_id, artist_name, album_name, album_image, published_year, song_name, song_streams, song_length, song_popularity) FROM './data/nosql/artists.csv' WITH HEADER=TRUE AND DELIMITER='|';