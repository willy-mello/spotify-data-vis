import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { Artists } from './components/Artists'
import { PieCharts } from './components/PieCharts'
import { ColumnChart } from './components/ColumnChart'
import { ProgressDisc } from './components/ProgressDisc'
import { ScoreBoard } from './components/ScoreBoard'
import { Summary } from './components/Summary'
import { reduceTopTracksData, stringifyIds, popularityScore, postiveExplainations } from './utils'


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
      topArtists: [],
      topTracks: [],
      artistString: '',
      musicAnalysis: [],
      popularity: 0,
      recommendationString: '',
      recommended: []
    }
    this.getRecommendations = this.getRecommendations.bind(this)
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

  getTopArtists() {
    const options = { limit: 50 }
    spotifyApi.getMyTopArtists(options)
      .then((response) => {
        this.setState({
          topArtists: response.items,
          popularity: popularityScore(response.items)
        });
      })
  }
  async getTopTracks() {
    try {
      const options = { limit: 25 }
      const response = await spotifyApi.getMyTopTracks(options)
      this.setState({
        topTracks: response.items,
        artistString: stringifyIds(response.items)
      });
    } catch (error) {
      console.error(error)
    }

  }
  async getFiveTopTracks() {
    try {
      const options = { limit: 5 }
      const response = await spotifyApi.getMyTopTracks(options)
      this.setState({
        recommendationString: stringifyIds(response.items)
      });
    } catch (error) {
      console.error(error)
    }
  }

  async getRecommendations() {
    try {
      const response = await spotifyApi.getRecommendations(this.state.recommendationString, this.state.recommendationString, this.state.recommendationString)
      this.setState({
        recommended: response.items
      });
    } catch (error) {
      console.error(error)
    }
  }
  getTrackAnalysis() {
    spotifyApi.getAudioFeaturesForTracks(this.state.artistString)
      .then((response) => {
        this.setState({
          musicAnalysis: reduceTopTracksData(response.audio_features)
        });
      })
  }
  populateState() {
    this.getTopArtists()
    this.getTopTracks()
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

            <button onClick={() => this.populateState()}>
              get top artists
              </button>
          }
          {this.state.topArtists.length > 0 &&

            <button onClick={() => this.getTrackAnalysis()}>
              Data Loaded, Show Me
              </button>
          }
        </div>
        {this.state.musicAnalysis.length === 0 &&

          <div className='spaceSaver'>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        }
        <div className='discBand'>
          {this.state.musicAnalysis.length > 0 &&
            this.state.musicAnalysis.map((elem, idx) => {

              return (
                <div className='disc'>
                  <ProgressDisc idx={idx} quality={elem} />
                </div>
              )

            })
          }
        </div>
        {this.state.musicAnalysis.length > 0 &&
          <div className="meatAndPotatoes">
            <div className="fillings">
              <ScoreBoard popularity={this.state.popularity} />
              <Artists artists={this.state.topArtists} />
            </div>
            <div className="fillings">
              <ColumnChart artists={this.state.topArtists} />
            </div>
            <div className="fillings">
              {/* <PieCharts artists={this.state.topArtists} /> */}

              <Summary getReccs={this.getRecommendations} recommended={this.state.recommended} />
            </div>
          </div>
        }

        <div className="footer">This is the Footer</div>
      </div>
    )
  }
}

export default App;
