import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Navigation from './Navigation';
import StudentsTable from './StudentsTable';
import AddStudentForm from './AddStudentForm';
import UpdateStudentForm from './UpdateStudentForm';

function App() {
  const baseURL = 'http://127.0.0.1:5000'; // Replace this with your Flask backend URL
  const [showTable, setShowTable] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const fetchStudentsData = () => {
    axios.get(`${baseURL}/api/students`)
      .then(response => {
        setStudentsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching students data:', error);
      });
  };

  const handleViewStudentsClick = () => {
    setShowTable(true);
    setShowAddForm(false);
    setShowUpdateForm(false);
  };

  const handleAddNewStudentClick = () => {
    setShowAddForm(true);
    setShowTable(false);
    setShowUpdateForm(false);
  };

  const handleUpdateStudentClick = () => {
    setShowUpdateForm(true);
    setShowTable(false);
    setShowAddForm(false);
  };

  const handleSearchInputChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="app">
      <div className="heading-container">
        <a href="/" className="header-link">
          <h1>Student Management System</h1>
        </a>
      </div>
      <Navigation
        onSearchInputChange={handleSearchInputChange}
        onViewStudentsClick={handleViewStudentsClick}
        onAddNewStudentClick={handleAddNewStudentClick}
        onUpdateStudentClick={handleUpdateStudentClick}
      />
      {showTable && <StudentsTable studentsData={studentsData} searchTerm={searchTerm} />}
      {showAddForm && <AddStudentForm fetchStudentsData={fetchStudentsData} baseURL={baseURL} />}
      {showUpdateForm && <UpdateStudentForm fetchStudentsData={fetchStudentsData} baseURL={baseURL} />}
      {!showTable && !showAddForm && !showUpdateForm && (
        <div className="welcome-message">
          <p>Welcome to the Student Management System made with React</p>
        </div>
      )}
      <div className="linkedin-logo">
        <a href="https://www.linkedin.com/in/ezhil-r-97120b238/" target="_blank" rel="noopener noreferrer">
          <img src="https://static.vecteezy.com/system/resources/previews/018/930/587/original/linkedin-logo-linkedin-icon-transparent-free-png.png" alt="LinkedIn" />
        </a>
      </div>
    </div>
  );
}

export default App;
