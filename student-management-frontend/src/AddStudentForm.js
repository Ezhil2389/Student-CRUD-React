import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Slider, Checkbox, Button } from '@mui/material';
import axios from 'axios';

const AddStudentForm = ({ fetchStudentsData, baseURL }) => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [classTeacher, setClassTeacher] = useState('');
  const [gpa, setGpa] = useState(0);
  const [feeStatus, setFeeStatus] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const studentData = {
      name,
      rollNumber,
      selectedClass,
      classTeacher,
      gpa,
      feeStatus,
    };

    axios.post(`${baseURL}/api/add-student`, studentData)
      .then(response => {
        console.log('Student added successfully!');
        fetchStudentsData(); // Fetch updated data after adding a new student
      })
      .catch(error => console.error('Error adding student:', error));

    // Reset the form fields after submission
    setName('');
    setRollNumber('');
    setSelectedClass('');
    setClassTeacher('');
    setGpa(0);
    setFeeStatus(false);
  };

  const handleGpaChange = (event, newValue) => {
    setGpa(newValue);
  };

  const handleFeeStatusChange = (event) => {
    setFeeStatus(event.target.checked);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Class</InputLabel>
        <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((cls) => (
            <MenuItem key={cls} value={cls}>
              {cls}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Class Teacher"
        value={classTeacher}
        onChange={(e) => setClassTeacher(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>GPA</InputLabel>
        <Slider value={gpa} onChange={handleGpaChange} min={0} max={5} step={0.1} valueLabelDisplay="auto" required />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Fee Status</InputLabel>
        <Checkbox
          checked={feeStatus}
          onChange={handleFeeStatusChange}
          inputProps={{ 'aria-label': 'controlled' }}
          required
        />
      </FormControl>
      <Button type="submit" variant="contained" color="primary" style={styles.submitButton}>
        Add Student
      </Button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '800px',
    margin: '20px auto',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    backgroundColor: '#fff',
  },
  submitButton: {
    marginTop: '10px',
    background: '#9288f8',
    color: '#fff',
  },
};

export default AddStudentForm;
