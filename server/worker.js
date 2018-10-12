require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const redis = require('redis');
const { promisify } = require('util');
const db = require('../database/cassandra');
const protectedData = require('../protected');

const cache = redis.createClient(protectedData.cachePort, protectedData.cacheIp);
const getAsyncCache = promisify(cache.get).bind(cache);
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public/')));

app.get('/artist/:artistId', (req, res) => {
  const artistId = parseInt(req.params.artistId, 10);

  const checkDb = () =>
    db.getTopTen(artistId).then(songs => {
      cache.setex(artistId, 604800, JSON.stringify(songs)); // Save for 1 week
      res.send(songs);
    });

  getAsyncCache(artistId)
    .then(result => {
      if (result === null || result === '') checkDb();
      else res.send(JSON.parse(result));
    })
    .catch(checkDb);
});

app.post('/artist/', (req, res) => {
  db.addSong(req.body)
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

app.put('/artist/update', (req, res) => {
  if (req.body.albumID === undefined || req.body.artistID === undefined) {
    res.sendStatus(400);
  }
  db.updateSong(req.body)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

app.delete('/artist/delete', (req, res) => {
  if (
    req.body.albumID === undefined ||
    req.body.artistID === undefined ||
    req.body.songName === undefined
  ) {
    res.sendStatus(400);
  }
  db.deleteSong(req.body)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

const PORT = protectedData.port;

app.listen(
  PORT,
  console.log(`Process ${process.pid} is listening to all incoming requests on port ${PORT}...`)
);
