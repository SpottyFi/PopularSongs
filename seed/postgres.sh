#!/bin/sh

SEED_DIR=$(pwd)
SQL_FILE=$SEED_DIR/postgres.sql

DATA_DIR=$SEED_DIR/data/sql
ARTISTS=$DATA_DIR/artists.csv
ALBUMS=$DATA_DIR/albums.csv
SONGS=$DATA_DIR/songs.csv

printf '\e[33mDefining Database and Tables...\e[0m\n'
psql spottyfi -f $SQL_FILE

printf '\n\e[33mCopying Artists...\e[0m\n'
psql spottyfi -c "COPY artists FROM '${ARTISTS}' DELIMITER ',' CSV HEADER;"

printf '\n\e[33mCopying Albums...\e[0m\n'
psql spottyfi -c "COPY albums FROM '${ALBUMS}' DELIMITER ',' CSV HEADER;"

printf '\n\e[33mCopying Songs...\e[0m\n'
psql spottyfi -c "COPY songs FROM '${SONGS}' DELIMITER ',' CSV HEADER;"

printf '\n\e[32mImport Complete!\e[0m'