import React from 'react';
import axios from 'axios';
import Song from './Song.jsx';
import styles from '../styles/App.css';
import CSSModules from 'react-css-modules';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMore: false,
      popularSongs: []
    };
  }

  componentDidMount() {
    const randNum = Math.floor(Math.random() * 250000) + 1;
    axios
      .get(`/artist/${randNum}`)
      .then(response => {
        this.setState({ popularSongs: response.data });
      })

      .catch(error => {
        console.log(error);
      });
  }

  createListOfSongs() {
    return this.state.popularSongs.map((e, i) => (
      <Song
        key={e.artistID + e.songName}
        counter={i + 1}
        albumURL={e.albumURL}
        songName={e.songName}
        streams={e.streams}
      />
    ));
  }

  fiveBestSongs() {
    return this.createListOfSongs().slice(0, 5);
  }

  render() {
    return (
      <div className={'container-fluid'} styleName={'popular-songs'}>
        <div className={'row'}>
          <div className={'col col-lg-1'}>
            <h3 styleName={'popular-title'}>Popular</h3>
          </div>
        </div>

        {this.state.showMore ? this.createListOfSongs() : this.fiveBestSongs()}

        <div className={'row'}>
          <div className={'col col-lg-1'} />
          <div className={'col'}>
            <button
              styleName={'spfy-btn'}
              className={'mt-5'}
              type={'button'}
              onClick={() => {
                this.setState({ showMore: !this.state.showMore });
              }}
            >
              {this.state.showMore ? 'SHOW ONLY 5 SONGS' : 'SHOW 5 MORE'}
            </button>
          </div>
          <div className={'col col-lg-1'} />
        </div>
      </div>
    );
  }
}

//export default App;
export default CSSModules(App, styles);
