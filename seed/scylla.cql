CREATE KEYSPACE IF NOT EXISTS spottyfi with REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE spottyfi;

CREATE TABLE IF NOT EXISTS artists (
 artist_id int,
 album_id int,
 artist_name text,
 album_name text,
 album_image text,
 published_year int,
 song_name text,
 song_streams int,
 song_length int,
 song_popularity int,
 PRIMARY KEY (artist_id, album_id, song_popularity, song_streams)
) WITH CLUSTERING ORDER BY (album_id ASC, song_popularity DESC, song_streams DESC);
