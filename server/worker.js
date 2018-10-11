require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../database/cassandra');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public/')));

app.get('/artist/:artistId', (req, res) => {
  const artistId = parseInt(req.params.artistId, 10);
  db.getTopTen(artistId).then(songs => {
    res.send(songs);
  });
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

const PORT = 3000;

app.listen(
  PORT,
  console.log(`Process ${process.pid} is listening to all incoming requests on port ${PORT}...`)
);
