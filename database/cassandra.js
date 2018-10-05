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

const getTopTen = (artistId, albumId) =>
  models.instance.Artists.findAsync({ artist_id: artistId, album_id: albumId });

module.exports.getTopTen = getTopTen;
