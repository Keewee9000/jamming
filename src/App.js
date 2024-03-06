import React, { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import './App.css';
import Spotify from './components/api/spotify.js';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('My playlist');
  

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults)
  }, []);

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const handleNameChange = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("My Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  return (
    <div className='App'>
      <div className='header'>
        <h1>Spotify Playlist Creator</h1>
        <SearchBar onSearch={search} />
      </div>
      <div className='lists'>
        <div className='searchResults'>
          <h2>Search Results</h2>
            <SearchResults
              searchResults={searchResults}
              onAdd={addTrack}
            />
        </div>
        <div className='playlist'>
            <Playlist
              playlistName={playlistName}
              onNameChange={handleNameChange}
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onSave={savePlaylist}
            />
        </div>     
      </div>    
    </div>
  );
};

export default App;
