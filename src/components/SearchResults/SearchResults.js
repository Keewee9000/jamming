import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './SearchResults.module.css'


function SearchResults({ searchResults, onAdd}) {
  const handleAddTrack = track => onAdd(track);

  return (
    <div className={styles.SearchResults}>
      
      <Tracklist tracks={searchResults} onAdd={handleAddTrack} />
    </div>
  );
}

export default SearchResults;