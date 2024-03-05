
import React, { useCallback } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

function Playlist(props) {

  const handleNameChange = useCallback(
    (event) => {
      props.onNameChange(event.target.value);
    },
    [props.onNameChange]
  );

  return (
    <div className={styles.Playlist}>
      <input
        onChange={handleNameChange}
        defaultValue={"My Playlist"}
        className={styles.PlaylistSearch}
      />
      <h2>{props.playlistName}</h2>
      <Tracklist 
        tracks={props.playlistTracks} 
        isRemoval={true} 
        onRemove={props.onRemove} 
      />
      <button className={styles.saveButton} onClick={props.onSave}>
        Save to Spotify
      </button>
    </div>
  );
};

export default Playlist;