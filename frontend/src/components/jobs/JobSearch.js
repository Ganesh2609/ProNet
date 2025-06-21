import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const JobSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim(), location.trim());
  };

  return (
    <div className="job-search">
      <form className="job-search-form" onSubmit={handleSubmit}>
        <div className="job-search-group">
          <FaSearch className="job-search-icon" />
          <input 
            type="text"
            className="job-search-input"
            placeholder="Search job titles, companies, or keywords"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        <div className="job-search-group">
          <FaMapMarkerAlt className="job-search-icon" />
          <input 
            type="text"
            className="job-search-input"
            placeholder="Location (city, state, or remote)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <button type="submit" className="job-search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default JobSearch;