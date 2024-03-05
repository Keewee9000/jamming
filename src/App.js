import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('My playlist');
  const [accessToken, setAccessToken] = useState('');

  const stateKey = 'spotify_auth_state';

  const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const access_token = params.get('access_token');
    const stateFromCallback = params.get('state');

    if (access_token && stateFromCallback === localStorage.getItem(stateKey)) {
      setAccessToken(access_token);
    }
  }, []);

  const handleLogin = () => {
    const client_id = 'e8cc8343db21481bb9e51d44bf9ab3f3';
    const redirect_uri = 'https://keewee9000.github.io/jamming';
    const state = generateRandomString(16);

    localStorage.setItem(stateKey, state);
    const scope = 'user-read-private user-read-email';

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location.href = url;
  };

  const addTrackToPlaylist = (track) => {
    if (!playlistTracks.some((t) => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrackFromPlaylist = (track) => {
    setPlaylistTracks(playlistTracks.filter((t) => t.id !== track.id));
  };

  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map(track => track.uri);
    console.log(trackURIs);
    setPlaylistName('');
    setPlaylistTracks([]);
  };

  return (
    <div className="App">
      {accessToken ? (
        <div>
          <div className='header'>
            <h1>My Spotify Playlist Creator</h1>
            <SearchBar setSearchResults={setSearchResults} />
          </div>
          <div className='lists'>
            <div className="searchResults">
              <h2>Search Results</h2>
              <SearchResults
                searchResults={searchResults}
                onAdd={addTrackToPlaylist}
              />
            </div>
            <div className='playlist'>
              <Playlist
                playlistName={playlistName}
                onNameChange={handleNameChange}
                playlistTracks={playlistTracks}
                onRemove={removeTrackFromPlaylist}
                onSave={savePlaylist}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Welcome to Your Spotify Playlist Creator!</h1>
          <button onClick={handleLogin}>Login with Spotify</button>
        </div>
      )}
    </div>
  );
}

export default App;
