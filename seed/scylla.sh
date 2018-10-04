#!/bin/sh

SEED_DIR=$(pwd)
CQL_FILE=$SEED_DIR/scylla.cql
SEED_FILE=$SEED_DIR/data/nosql/artists.csv

printf '\e[33mDefining Database and Tables...\e[0m\n'
cqlsh -f $CQL_FILE

printf '\n\e[33mCopying Data...\e[0m\n'
cqlsh -e "COPY spottyfi.artists(artist_id, album_id, song_id, artist_name, album_name, album_image, published_year, song_name, song_streams, song_length, song_popularity) FROM '${SEED_FILE}' WITH HEADER=TRUE AND DELIMITER='|';"

printf '\n\e[32mImport Complete!\e[0m'

# Optional command using cassandra-loader if cqlsh is buggy
# ./cassandra-loader -f artists.csv -host 172.17.0.2 -schema "spottyfi.artists(artist_id, album_id, song_id, artist_name, album_name, album_image, published_year, song_name, song_streams, song_length, song_popularity)" -delim "|"