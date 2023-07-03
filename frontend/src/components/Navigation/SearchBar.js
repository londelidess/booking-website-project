import React, { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
    // Add search functionality here
  };

  return (
    <input
      type="text"
      value={search}
      onChange={handleSearch}
      placeholder="Search..."
    />
  );
}

export default SearchBar;
