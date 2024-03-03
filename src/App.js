import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import './App.css';

const defaultTracks = [
  {
    id: '1',
    name: 'Can`t Hold Back',
    artist: 'You Me At Six',
    album: 'Night People',
    uri: 'spotify:track:4iYkScARIhrFEKlG4frTE6'
  },
  {
    id: '2',
    name: 'Thunderstruck',
    artist: 'AC/DC',
    album: 'The Razors Edge',
    uri: 'spotify:track:57bgtoPSgt236HzfBOd8kj'
  },
  {
    id: '3',
    name: 'Yellow',
    artist: 'Coldplay',
    album: 'Parachutes',
    uri: 'spotify:track:3AJwUDP919kvQ9QcozQPxg'

  }
  
];



function App() {



  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('My playlist')



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
  }



  return (
    <div className="App">
      <div className='header'>
        <h1>My Spotify Playlist Creator</h1>
        <SearchBar setSearchResults={defaultTracks}  //{setSearchResults} 
      />
      </div>
      <div className='lists'>
        <div className="searchResults">
          <h2>Search Results</h2>
          <SearchResults
            searchResults={defaultTracks}   //{searchResults}
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
  );
}

export default App;
