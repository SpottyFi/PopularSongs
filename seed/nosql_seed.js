const faker = require('faker'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs');

// Define minimum number of songs needed to be generated
const minSongs = 10000000;

// Define common file path for all JSON files with filenum prepended to the file names.
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
fs.writeFileSync(
  artistsFile,
  'artist_id|album_id|artist_name|album_name|album_image|published_year|song_name|song_streams|song_length|song_popularity',
  throwErr
);

// Define empty string which will be populated wtih csv data and then pushed into file
let entries = '';

const max = Math.ceil(minSongs / 40);
let iterations = 0;
let albumCount = 0;
let songCount = 0;
for (let artistId = 1; artistId <= max; artistId += 1) {
  console.log('Generating artist', artistId);
  iterations += 1;

  const artistName = faker.random.words().replace(/['"]+/g, '');

  // Generate a random number of albums between 3 and 6
  const albumNumber = faker.random.number({ min: 3, max: 6 });
  for (let albumId = 1; albumId <= albumNumber; albumId += 1) {
    albumCount += 1;
    const albumName = faker.random.words().replace(/['"]+/g, '');
    const imgNum = faker.random.number({ min: 1, max: 1000 });
    const albumImage = `https://s3-us-west-1.amazonaws.com/spottyfi/images/${imgNum}.jpeg`;
    const publishedYear = faker.random.number({ min: 1980, max: 2018 });

    // Generate a random number of songs between 10 and 13
    const songNumber = faker.random.number({ min: 10, max: 13 });
    for (let songId = 1; songId <= songNumber; songId += 1) {
      songCount += 1;
      const songName = faker.random.words().replace(/['"]+/g, '');
      const length = faker.random.number({ min: 30, max: 220 });
      const popularity = faker.random.number({ min: 1, max: 8 }); // Popularity scale of 1 to 8. This measure is used to sort the popular songs
      const streams = faker.random.number({ min: 1000, max: 250000000 }); // Streams is the secondary measure used to sort popular songs.

      // Push a row to entries string with data for all the required columns
      entries +=
        `\n${artistId}|${albumId}|'${artistName}'|'${albumName}'|'${albumImage}'` +
        `|${publishedYear}|'${songName}'|${streams}|${length}|${popularity}`;
    }
  }

  // Writes to file every 5000 rows, or if we have reached the end, and clears the strings.
  if (iterations === 5000 || artistId === max) {
    fs.appendFileSync(artistsFile, entries, throwErr);
    entries = '';
    iterations = 0;
  }
}
console.log(`NoSQL SEED: ${songCount} songs, ${albumCount} albums, and ${max} artists generated!`);
