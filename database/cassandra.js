const models = require('express-cassandra');
const path = require('path');

models.setDirectory(path.join(__dirname, '/models')).bind(
  {
    clientOptions: {
      contactPoints: ['127.0.0.1'],
      protocolOptions: { port: 9042 },
      keyspace: 'spottyfi',
      queryOptions: { consistency: models.consistencies.one }
    },
    ormOptions: {
      defaultReplicationStrategy: {
        class: 'SimpleStrategy',
        replication_factor: 1
      },
      migration: 'safe'
    }
  },
  err => {
    if (err) throw err;
  }
);

const getTopTen = artistId => {
  return models.instance.Artists.findAsync({ artist_id: artistId })
    .then(data => {
      return data.sort((song1, song2) => {
        // Sorted in descending order
        if (song1.song_popularity === song2.song_popularity) {
          if (song1.song_streams > song2.song_streams) {
            return -1;
          }
          if (song1.song_streams < song2.song_streams) {
            return 1;
          }
          return 0;
        }
        if (song1.song_popularity > song2.song_popularity) {
          return -1;
        }
        if (song1.song_popularity < song2.song_popularity) {
          return 1;
        }
      });
    })
    .then(data => {
      const songs = [];
      for (let i = 0; i < 10; i += 1) {
        const songData = data[i];
        const song = {};
        song.albumID = songData.album_id;
        song.artistID = songData.artist_id;
        song.songID = songData.song_id;
        song.popularity = songData.song_popularity;
        song.streams = songData.song_streams;
        song.albumURL = songData.album_image.replace(/[']/g, '');
        song.albumName = songData.album_name.replace(/[']/g, '');
        song.songName = songData.song_name.replace(/[']/g, '');
        songs.push(song);
      }
      return songs;
    });
};

module.exports.getTopTen = getTopTen;
