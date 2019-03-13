import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { Artists } from './components/Artists'
import { PieCharts } from './components/PieCharts'
import { BarChart } from './components/BarChart'

const spotifyApi = new SpotifyWebApi()

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      topArtists: []
    }

  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
        });
      })
  }
  getTop100() {
    const options = '{"limit":"50"}'
    console.log('gettop100 clicked')
    spotifyApi.getMyRecentlyPlayedTracks()
      .then((response) => {
        console.log('recently played', response)
        // this.setState({
        //   nowPlaying: {
        //     name: response.item.name,
        //     albumArt: response.item.album.images[0].url
        //   }
        // });
      })
  }
  getTopArtists() {
    const options = { limit: 50 }
    console.log('gettopArtists clicked')
    spotifyApi.getMyTopArtists(options)
      .then((response) => {
        console.log('response.items', response.items)
        this.setState({
          topArtists: response.items
        });
      })
  }
  render() {
    return (
      <div className="App">
        <div className='header'>
          <a href='http://localhost:8888' > Login to Spotify </a>

          {/* <div>
          Now Playing: {this.state.nowPlaying.name}
          </div>
          <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div> */}
          {/* {this.state.loggedIn &&
          <div>
          <button onClick={() => this.getNowPlaying()}>
          Check Now Playing
          </button>
          
          </div>
        } */}
          {this.state.loggedIn &&
            <div>

              <button onClick={() => this.getTopArtists()}>
                get top artists
              </button>
            </div>
          }
        </div>
        <div className='discBand'>
          <span>this is the discBand</span>
          {/* <Disc> */}
        </div>
        <div className="meatAndPotatoes">
          <span>This is the Meat and Potatoes</span>

        </div>

        {this.state.topArtists.length > 0 &&
          <Artists artists={this.state.topArtists} />

        }
        {this.state.topArtists.length > 0 &&
          <PieCharts artists={this.state.topArtists} />

        }
        {this.state.topArtists.length > 0 &&
          <BarChart artists={this.state.topArtists} />

        }
        <div className="footer">This is the Footer</div>
      </div>
    )
  }
}

export default App;
