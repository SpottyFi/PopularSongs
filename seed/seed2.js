const faker = require('faker'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs');

const stream = fs.createWriteStream('seed/data/seed_data2.json');

stream.write('[');
const MAX = parseInt(process.env.MAX, 10);
let counter = 0;
for (let i = 1; i <= MAX; i += 1) {
  const artist = {
    artistID: i,
    artistName: faker.name.findName(),
    albums: []
  };
  const albumNumber = faker.random.number({ min: 3, max: 6 });
  for (let j = 0; j < albumNumber; j += 1) {
    counter += 1;
    const imgNum = Math.floor(Math.random() * 1000) + 1;
    const album = {
      albumID: i * 10 + j,
      albumName: faker.random.words(),
      albumImage: `https://s3-us-west-1.amazonaws.com/spottyfi/images/${imgNum}.jpeg`,
      publishedYear: Math.floor(Math.random() * 69) + 1950,
      songs: []
    };
    const songNumber = Math.floor(Math.random() * 10) + 12;
    for (let k = 0; k < songNumber; k += 1) {
      const song = {
        songID: i * 100 + j * 10 + k,
        songName: faker.random.words(),
        streams: Math.floor(Math.random() * 250000000),
        length: Math.floor(Math.random() * 221) + 30,
        popularity: Math.floor(Math.random() * 8) + 1,
        addedToLibrary: faker.random.boolean()
      };
      album.songs.push(song);
    }
    artist.albums.push(album);
  }
  stream.write(JSON.stringify(artist) + (i !== MAX ? ',' : ''));
}
stream.write(']');
stream.end(() => {
  console.log('SEED SCRIPT 3:', counter, 'albums created');
});
