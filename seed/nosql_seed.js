const faker = require('faker'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs');

// Define minimum number of songs needed to be generated
const minSongs = 500;

// Define common file path for all JSON files with filenum prepended to the file names.
const fileNum = 0;
const filePath = `seed/data/nosql/`;

// Define path for the CSV file.
const artistsFile = `${filePath}artists.csv`;

// A callback for fs functions that throws an error if there was an issue while accessing / modifying the file.
const throwErr = err => {
  if (err) {
    throw err;
  }
};

// Create / clear the files before beginning the data generation and populate it with the column names
fs.writeFileSync(artistsFile, 'artist_id,artist_name,albums', throwErr);

// Define empty string which will be populated wtih csv data and then pushed into file
let artists = '';

const max = Math.ceil(minSongs / 40);
const buffer = fileNum * max;
let iterations = 0;
let albumId = 1;
let songId = 1;
for (let i = 1; i <= max; i += 1) {
  console.log('Generating artist', i);
  iterations += 1;

  // Define empty arrays which will be populated with JSON data and stored inside the artist table
  const albums = [];
  const songs = [];

  const artistId = buffer + i;
  const artistName = faker.random.words();

  // Generate a random number of albums between 3 and 6
  const albumNumber = faker.random.number({ min: 3, max: 6 });
  for (let j = 1; j <= albumNumber; j += 1) {
    const albumName = faker.random.words();
    const imgNum = faker.random.number({ min: 1, max: 1000 });
    const albumImage = `https://s3-us-west-1.amazonaws.com/spottyfi/images/${imgNum}.jpeg`;
    const publishedYear = faker.random.number({ min: 1980, max: 2018 });

    // Generate a random number of songs between 10 and 13
    const songNumber = faker.random.number({ min: 10, max: 13 });
    for (let k = 1; k <= songNumber; k += 1) {
      const songName = faker.random.words();
      const length = faker.random.number({ min: 30, max: 220 });
      const popularity = faker.random.number({ min: 1, max: 8 }); // Popularity scale of 1 to 8. This measure is used to sort the popular songs
      const streams = faker.random.number({ min: 1000, max: 250000000 }); // Streams is the secondary measure used to sort popular songs.

      // Push a row to songs array with data for all the required columns
      songs.push(
        `{ song_id: ${songId}, song_name: '${songName}', streams: ${streams}, length: ${length}, popularity: ${popularity} }`
      );
      songId += 1;
    }
    /*
    artist_id,artist_name,albums
    3,Jane Smith,"[ { album_id: 1, album_name: 'a', album_image: 'b', published_year: 1990, songs: [ { song_id: 1, song_name: 'a', streams: 1, length: 30, popularity: 343, added_to_library: true } ] } ]"
    */
    // Push a row to albums array with data for all the required columns
    albums.push(
      `{ album_id: ${albumId}, album_name: '${albumName}', album_image: '${albumImage}', published_year: ${publishedYear}, songs: [ ${songs.join(
        ', '
      )} ] }`
    );
    albumId += 1;
  }
  // Create a new Artist
  artists += `\n${artistId},${artistName},"[ ${albums.join(', ')} ]"`;

  // Writes to file every 500 artists, or if we have reached the end, and clears the strings.
  if (iterations === 5000 || i === max) {
    fs.appendFileSync(artistsFile, artists, throwErr);
    artists = '';
    iterations = 0;
  }
}
console.log(`SEED ${fileNum}: ${songId} songs generated!`);
