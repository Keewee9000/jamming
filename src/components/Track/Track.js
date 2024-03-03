import React from 'react';
import styles from './Track.module.css';

function Track({ track, onAdd, onRemove }) {
  const handleAdd = () => {
    onAdd(track);
  };

  const handleRemove = () => {
    onRemove(track);
  };

  return (
    <div className={styles.Track}>
      <div className={styles.TrackInformation}>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button className={styles.add} onClick={handleAdd}>+</button>
      <button className={styles.remove} onClick={handleRemove}>x</button>
    </div>
  );
}

export default Track;
