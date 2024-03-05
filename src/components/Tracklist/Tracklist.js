import React from 'react';
import Track from '../Track/Track';
import styles from './Tracklist.module.css'

const Tracklist = (props) => {
  return (
    <div className="Tracklist">
      {props.tracks.map((track) => {
        return (
          <Track
            track={track}
            key={track.id}
            onAdd={props.onAdd}
            onRemove={props.onRemove}
            isRemoval={props.isRemoval}
            className={styles.tracks}
          />
          );
      })}
    </div>
  );
}

export default Tracklist;