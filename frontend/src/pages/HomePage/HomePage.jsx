import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search logic here
    console.log('Searching for:', query);
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of the application.</p>
      
      <div className="input__container">
        <div className="shadow__input"></div>
        <button className="input__button__shadow" type="submit" onClick={handleSearch}>
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
            <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fillRule="evenodd" fill="#17202A"></path>
          </svg>
        </button>
        <button className="p-2 hover:bg-gray-100 focus:outline-none" type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="h-6 w-6 text-gray-600"
          viewBox="0 0 24 21"
        >
          <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            id="SVGRepo_tracerCarrier"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              stroke="#000000"
              d="M8 16L12 12M12 12L16 16M12 12V21M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935"
            ></path>
          </g>
        </svg>
      </button>
        <input
          type="text"
          name="text"
          className="input__search"
          placeholder="Ask CropSage ^ ^"
          value={query}
          onChange={handleInputChange}
        />
      </div>
      
      
    </div>
  );
};

export default HomePage;
