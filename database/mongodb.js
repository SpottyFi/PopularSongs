const mongoose = require('mongoose');
// const db = require('../config/keys').mongoURI;
const db = require('../config/keys').mongoMlab;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  id: Number,
  name: String,
  albums: [
    {
      id: Number,
      name: String,
      img: String,
      publish: Number,
      songs: [
        {
          id: Number,
          name: String,
          streams: Number,
          length: Number,
          popularity: Number,
          library: Boolean
        }
      ]
    }
  ]
});

const Artists = mongoose.model('Artists', ArtistSchema);

const getSongs = id => {
  return Artists.findOne({ id });
};

const addSong = data => {
  return Artists.findOne({ id: data.artistID })
    .findOne({ 'albums.id': data.albumID })
    .findOneAndUpdate({ 'songs.id': data.songID }, { $set: data.update })
    .then(result => result.getQuery());
};

const updateSong = data => {
  return Artists.findOne({ id: data.artistID })
    .findOne({ 'albums.id': data.albumID })
    .findOneAndUpdate({ 'songs.id': data.songID }, { $set: data.update })
    .then(result => result.getQuery());
};

const deleteSong = data => {
  return Artists.findOne({ id: data.artistID })
    .findOne({ 'albums.id': data.albumID })
    .findOneAndDelete({ 'songs.id': data.songID });
};

module.exports = {
  addSong,
  getSongs,
  updateSong,
  deleteSong
};
