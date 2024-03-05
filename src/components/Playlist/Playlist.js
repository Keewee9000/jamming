import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

function Playlist({ playlistName, onNameChange, playlistTracks, onRemove, onSave }) {

  return (
    <div className={styles.Playlist}>
      <input
        type="text"
        value={playlistName}
        onChange={onNameChange}
        placeholder="New Playlist Name"
        className={styles.PlaylistSearch}
      />
      <h2>{playlistName}</h2>
      <Tracklist tracks={playlistTracks} onRemove={onRemove} />
      <button className={styles.saveButton} onClick={onSave}>Save to Spotify</button>
    </div>
  );
}

export default Playlist;