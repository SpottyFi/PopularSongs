const { exec } = require('child_process');

const subProcessCallback = (err, stdout, stderr) => {
  if (err) {
    console.log(stderr);
    throw err;
  }
  console.log(stdout);
};

const MIN_SONGS = 10000000;
const TOTAL_ARTISTS = MIN_SONGS / 40; // ~10 songs per album, ~4 albums per artist
// const MAX = Math.ceil(TOTAL_ARTISTS / 4);

// for (let FILENUM = 1; FILENUM <= 4; FILENUM += 1) {
exec('node ./seed/sql_seed.js', { env: { MAX: TOTAL_ARTISTS, FILENUM: 0 } }, subProcessCallback);
// }
console.log('Generating data...');
