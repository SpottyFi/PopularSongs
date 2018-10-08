module.exports = {
  fields: {
    artist_id: 'int',
    album_id: 'int',
    song_popularity: 'int',
    song_streams: 'int',
    album_image: 'text',
    album_name: 'text',
    artist_name: 'text',
    published_year: 'int',
    song_length: 'int',
    song_name: 'text'
  },
  key: ['artist_id', 'album_id', 'song_popularity', 'song_streams'],
  clustering_order: { song_popularity: 'desc', song_streams: 'desc' }
};
