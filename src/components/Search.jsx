import React from 'react';
import searchIcon from '../assets/search.svg';

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="type something here..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input-box"
      />
      <button aria-label="search-button" className="search-button" type="button">
        <img src={searchIcon} alt="search icon" />
      </button>
    </div>
  );
};

export default Search;
