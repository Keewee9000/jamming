import React, {useState} from 'react';
import styles from './SearchBar.module.css';

function SearchBar(setSearchResults) {
  const [query, setQuery] = useState('');

  return (
    <div className="SearchBar">
      <input
        className={styles.inputSearch}
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={styles.searchBar} onClick={setSearchResults}>Search</button>
    </div>
  );
}

export default SearchBar;
