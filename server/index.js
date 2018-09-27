const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('../database/mongodb');
const path = require('path');
const cors = require('cors');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public/')));

app.get('/artist/:id', function(req, res) {
  let artistId = parseInt(req.params.id, 10);
  mongodb
    .getSongs(artistId)
    .then(songs => res.send(songs))
    .catch(err => {
      console.error(err);
      res.sendStatus(400);
    });
});

// expect to receive {artistID, albumID, songID, added -> bool either 1 or 0}
app.post('/artist/', function(req, res) {
  let update = {};
  var objProp = `albums.${req.body.albumID}.songs`;
  update[objProp] = !!parseInt(req.body.added, 10);

  Artists.findOneAndUpdate({ id: req.body.artistID }, { $set: update })
    // TO DO: get current boolean value from db and send back along with mssg
    .then(() =>
      res.json({ message: 'success', added: !!parseInt(req.body.added, 10) })
    )
    .catch(() => res.status(400).json({ message: 'bad request' }));
});

app.put('/artist/update', function(req, res) {
  if (req.body.albumID === undefined || req.body.songID === undefined) {
    res.sendStatus(400);
  }
  mongodb
    .updateSong(req.body)
    .then(result => res.json(result))
    .catch(err => {
      console.error(err);
      res.sendStatus(400);
    });
});

app.delete('/artist/delete', function(req, res) {
  if (req.body.albumID === undefined || req.body.songID === undefined) {
    res.sendStatus(400);
  }
  mongodb
    .updateSong(req.body)
    .then(() => res.json({ message: 'success' }))
    .catch(err => {
      console.error(err);
      res.sendStatus(400);
    });
});

const PORT = 3000;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
