const faker = require('faker'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs');

// Define minimum number of songs needed to be generated
const minSongs = 10000000;

// Define common file path for all JSON files with filenum prepended to the file names.
const fileNum = 0;
const filePath = `seed/data/sql/`;

// Define paths for the 3 CSV files.
const artistsFile = `${filePath}artists.csv`;
const albumsFile = `${filePath}albums.csv`;
const songsFile = `${filePath}songs.csv`;

// A callback for fs functions that throws an error if there was an issue while accessing / modifying the file.
const throwErr = err => {
  if (err) {
    throw err;
  }
};

// Create / clear the files before beginning the data generation and populate it with the column names
fs.writeFileSync(artistsFile, 'id,name', throwErr);
fs.writeFileSync(albumsFile, 'id,name,image,year,artist_id', throwErr);
fs.writeFileSync(songsFile, 'id,name,streams,length,popularity,album_id', throwErr);

// Define empty strings which will be populated wtih csv data and then pushed into file
let artists = '';
let albums = '';
let songs = '';

const max = Math.ceil(minSongs / 40);
const buffer = fileNum * max;
let iterations = 0;
let albumId = 1;
let songId = 1;
for (let i = 1; i <= max; i += 1) {
  console.log('Generating artist', i);
  iterations += 1;

  const artistId = buffer + i;
  const artistName = faker.random.words();

  // Create a new Artist
  artists += `\n${artistId},"${artistName}"`;

  // Generate a random number of albums between 3 and 6
  const albumNumber = faker.random.number({ min: 3, max: 6 });
  for (let j = 1; j <= albumNumber; j += 1) {
    const albumName = faker.random.words();
    const imgNum = faker.random.number({ min: 1, max: 1000 });
    const albumImage = `https://s3-us-west-1.amazonaws.com/spottyfi/images/${imgNum}.jpeg`;
    const publishedYear = faker.random.number({ min: 1980, max: 2018 });

    // Push a row to albums string with data for all the required columns
    albums += `\n${albumId},"${albumName}","${albumImage}",${publishedYear},${artistId}`;

    // Generate a random number of songs between 10 and 13
    const songNumber = faker.random.number({ min: 10, max: 13 });
    for (let k = 1; k <= songNumber; k += 1) {
      const songName = faker.random.words();
      const length = faker.random.number({ min: 30, max: 220 });
      const popularity = faker.random.number({ min: 1, max: 8 }); // Popularity scale of 1 to 8. This measure is used to sort the popular songs
      const streams = faker.random.number({ min: 1000, max: 250000000 }); // Streams is the secondary measure used to sort popular songs.

      // Push a row to songs string with data for all the required columns
      songs += `\n${songId},"${songName}",${streams},${length},${popularity},${albumId}`;
      songId += 1;
    }
    albumId += 1;
  }

  // Writes to file every 500 artists, or if we have reached the end, and clears the strings.
  if (iterations === 5000 || i === max) {
    fs.appendFileSync(artistsFile, artists, throwErr);
    fs.appendFileSync(albumsFile, albums, throwErr);
    fs.appendFileSync(songsFile, songs, throwErr);
    artists = '';
    albums = '';
    songs = '';
    iterations = 0;
  }
}
console.log(`SEED ${fileNum}: ${songId} songs generated!`);
