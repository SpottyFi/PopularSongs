import React from 'react';
import CSSModules from 'react-css-modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Song.css';

class Song extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      hover: false,
      check: false,
      playPause: false,
      fixedPlay: true
    };
  }

  displayNumber() {
    return <div id={styles.number}>{this.props.counter}</div>;
  }

  displayPlay() {
    return (
      <FontAwesomeIcon
        id={styles.play}
        icon={faPlayCircle}
        size="lg"
        onClick={() => {
          this.setState({ playPause: !this.state.playPause, fixedPlay: false });
        }}
      />
    );
  }

  displayPause() {
    return (
      <FontAwesomeIcon
        id={styles.play}
        icon={faPauseCircle}
        size="lg"
        onClick={() => {
          this.setState({ playPause: !this.state.playPause, fixedPlay: true });
        }}
      />
    );
  }

  displayCheck() {
    return <ion-icon name="checkmark" />;
  }

  displayPlus() {
    return <ion-icon styleName={'plus'} name={'ios-add'} />;
  }

  toggle() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }

  songNameStyle() {
    return this.state.fixedPlay ? 'song-name' : 'song-is-playing';
  }

  streamsStyle() {
    return this.state.fixedPlay ? 'streams' : 'song-is-playing';
  }

  more() {
    return (
      <div className={'dropdown'} styleName={'test'}>
        <ion-icon styleName={'more'} name={'ios-more'} data-toggle={'dropdown'} />
        <div
          className={'dropdown-menu'}
          styleName={'more-options'}
          aria-labelledby={'dropdownMenuButton'}
        >
          <a className={'dropdown-item'} styleName={'more-op'} href="#">
            Add to Queue
          </a>
          <a className={'dropdown-item'} styleName={'more-op'} href="#">
            Go to Song Radio
          </a>
          <div className="dropdown-divider" styleName={'line'} />
          <a className={'dropdown-item'} styleName={'more-op'} href="#">
            Go to Artist
          </a>
          <a className={'dropdown-item'} styleName={'more-op'} href="#">
            Go to Album
          </a>
          <a className={'dropdown-item'} styleName={'more-op'} href="#">
            Show Credits
          </a>
          <div className="dropdown-divider" styleName={'line'} />
          <a className={'dropdown-item'} styleName={'more-op'} href="#">
            Save to Your Library
          </a>
          <a className={'dropdown-item'} styleName={'more-op'} href="#">
            Add to Playlist
          </a>
          <div className="dropdown-divider" styleName={'line'} />
          <a className={'dropdown-item'} styleName={'more-op'} href="#">
            Share
          </a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        className={'row'}
        styleName={'song'}
        onMouseOver={() => {
          this.setState({ hover: true });
        }}
        onMouseOut={() => this.setState({ hover: false })}
      >
        <div className={'col col-lg-1'}>
          <img
            id={styles.cover}
            src={this.props.albumURL}
            alt={'artist album cover'}
            width={'50'}
          />
        </div>

        <div className={'col col-lg-1'} styleName={'song-number-play'}>
          {!this.state.hover && this.state.fixedPlay
            ? this.displayNumber()
            : this.state.playPause
              ? this.displayPause()
              : this.displayPlay()}
        </div>

        <div
          className={'col col-lg-1'}
          onClick={() => {
            this.setState({ check: !this.state.check });
          }}
        >
          {this.state.check ? this.displayCheck() : this.displayPlus()}
        </div>

        <div className={'col col-lg-6'} styleName={this.songNameStyle()}>
          {this.props.songName}
        </div>

        <div className={'col col-lg-1'}>{this.more()}</div>

        <div className={'col col-lg-2'} styleName={this.streamsStyle()}>
          {this.props.streams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </div>
      </div>
    );
  }
}

export default CSSModules(Song, styles);
