import React, {useCallback} from 'react';
import styles from './Track.module.css';

const Track = (props) => {
  const handleAdd = useCallback(
    (event) => {
      props.onAdd(props.track);
    },
    [props.onAdd, props.track]
  );

  const handleRemove = useCallback(
    (event) => {
      props.onRemove(props.track);
    },
    [props.onRemove, props.track]
  );

  const renderAction = () => {
    if (props.isRemoval) {
      return (
        <button className={styles.TrackAction} onClick={handleRemove}>
          -
        </button>
      );
    }
    return (
      <button className={styles.TrackAction} onClick={handleAdd}>
        +
      </button>
    );
  };

  return (
    <div className={styles.Track}>
      <div className={styles.TrackInformation}>
        <h3>{props.track.name}</h3>
        <p>{props.track.artist} | {props.track.album}</p>
      </div>
      {renderAction()}
    </div>
  );
}

export default Track;
