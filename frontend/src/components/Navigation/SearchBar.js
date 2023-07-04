import React, { useState } from 'react';
import "./SearchBar.css"

const SearchBar = () => {
  const [search, setSearch] = useState({
    location: '',
    checkIn: '',
    guests: ''
  });

  const handleSearch = (event) => {
    setSearch({
      ...search,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className="bar">
      <div className="location">
        {/* <p>Location</p> */}
        <input type="text" placeholder="Anywhere" name="location" value={search.location} onChange={handleSearch} />
      </div>
      <div className="check-in">
        {/* <p>Check in</p> */}
        <input type="text" placeholder="Any week" name="checkIn" value={search.checkIn} onChange={handleSearch} />
      </div>
      <div className="guests">
        {/* <p>Guests</p> */}
        <input type="text" placeholder="Add guests" name="guests" value={search.guests} onChange={handleSearch} />
        <span><i className="lni lni-search-alt"></i></span>
      </div>
    </div>
  );
}

export default SearchBar;
