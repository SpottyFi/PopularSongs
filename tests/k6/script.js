import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 400,
  duration: '10s',
  rps: 3000
};

export default function() {
  const artistId = Math.floor(Math.random() * 25000) + 1;
  const albumId = Math.floor(Math.random() * 10) + 1;
  const res = http.get(`http://localhost:3000/artist/${artistId}/${albumId}`);
  check(res, {
    'status was 200': r => r.status === 200,
    'transaction time OK': r => r.timings.duration < 800
  });
}
