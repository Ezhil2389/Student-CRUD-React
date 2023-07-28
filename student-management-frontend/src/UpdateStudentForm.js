import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Slider, Button, MenuItem, Select } from '@mui/material';
import axios from 'axios';

const UpdateStudentForm = ({ fetchStudentsData, baseURL }) => {
  const [updateBy, setUpdateBy] = useState('GPA');
  const [rollNumber, setRollNumber] = useState('');
  const [gpa, setGpa] = useState(0);
  const [feeStatus, setFeeStatus] = useState('PAID');

  const handleSubmit = (event) => {
    event.preventDefault();
    const studentData = {
      updateBy,
      rollNumber,
      gpa,
      feeStatus,
    };

    axios.post(`${baseURL}/api/update-student`, studentData)
      .then(response => {
        console.log('Student updated successfully!');
        fetchStudentsData(); // Fetch updated data after updating the student
      })
      .catch(error => console.error('Error updating student:', error));

    // Reset the form fields after submission
    setUpdateBy('GPA');
    setRollNumber('');
    setGpa(0);
    setFeeStatus('PAID');
  };

  const handleGpaChange = (event, newValue) => {
    setGpa(newValue);
  };

  const handleFeeStatusChange = (event) => {
    setFeeStatus(event.target.value);
  };

  const handleUpdateByChange = (event) => {
    setUpdateBy(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Update By</InputLabel>
        <Select value={updateBy} onChange={handleUpdateByChange} required>
          <MenuItem value="GPA">GPA</MenuItem>
          <MenuItem value="Fee Status">Fee Status</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      {updateBy === 'GPA' ? (
        <FormControl fullWidth margin="normal">
          <InputLabel>GPA</InputLabel>
          <Slider value={gpa} onChange={handleGpaChange} min={0} max={5} step={0.1} valueLabelDisplay="auto" required />
        </FormControl>
      ) : (
        <FormControl fullWidth margin="normal">
          <InputLabel>Fee Status</InputLabel>
          <Select value={feeStatus} onChange={handleFeeStatusChange} required>
            <MenuItem value="PAID">PAID</MenuItem>
            <MenuItem value="NOT PAID">NOT PAID</MenuItem>
          </Select>
        </FormControl>
      )}
      <Button type="submit" variant="contained" color="primary" style={styles.submitButton}>
        Update Student
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
  },
};

export default UpdateStudentForm;
