import React, { useState } from 'react';
import './App.css';

const Navigation = ({ onSearchInputChange, onViewStudentsClick, onAddNewStudentClick, onUpdateStudentClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchInputChange(event.target.value);
  };

  return (
    <nav className="navbar">
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search Students"
          className="input"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
      </div>
      <button className="nav-button" onClick={onViewStudentsClick}>
        View Students
      </button>
      <button className="nav-button" onClick={onAddNewStudentClick}>
        Add New Student
      </button>
      <button className="nav-button" onClick={onUpdateStudentClick}>
        Update Student
      </button>
    </nav>
  );
};

export default Navigation;
