require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../database/cassandra');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public/')));

app.get('/artist/:artistId/:albumId', (req, res) => {
  const artistId = parseInt(req.params.artistId, 10);
  const albumId = parseInt(req.params.albumId, 10);
  db.getTopTen(artistId, albumId).then(test => {
    res.send(test);
  });
  // mongodb
  //   .getSongs(artistId)
  //   .then(songs => res.send(songs))
  //   .catch(err => {
  //     console.error(err);
  //     res.sendStatus(400);
  //   });
});

// expect to receive {artistID, albumID, songID, added -> bool either 1 or 0}
// app.post('/artist/', (req, res) => {
//   let update = {};
//   var objProp = `albums.${req.body.albumID}.songs`;
//   update[objProp] = !!parseInt(req.body.added, 10);

//   Artists.findOneAndUpdate({ id: req.body.artistID }, { $set: update })
//     // TO DO: get current boolean value from db and send back along with mssg
//     .then(() => res.json({ message: 'success', added: !!parseInt(req.body.added, 10) }))
//     .catch(() => res.status(400).json({ message: 'bad request' }));
// });

// app.put('/artist/update', (req, res) => {
//   if (req.body.albumID === undefined || req.body.songID === undefined) {
//     res.sendStatus(400);
//   }
//   mongodb
//     .updateSong(req.body)
//     .then(result => res.json(result))
//     .catch(err => {
//       console.error(err);
//       res.sendStatus(400);
//     });
// });

// app.delete('/artist/delete', (req, res) => {
//   if (req.body.albumID === undefined || req.body.songID === undefined) {
//     res.sendStatus(400);
//   }
//   mongodb
//     .updateSong(req.body)
//     .then(() => res.json({ message: 'success' }))
//     .catch(err => {
//       console.error(err);
//       res.sendStatus(400);
//     });
// });

const PORT = 3000;

app.listen(
  PORT,
  console.log(`Process ${process.pid} is listening to all incoming requests on port ${PORT}...`)
);
