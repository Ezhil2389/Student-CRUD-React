import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const StudentsTable = ({ studentsData, searchTerm }) => {
  const filteredData = studentsData.filter(
    student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.classTeacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TableContainer component={Paper} className='table-container'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className='table-cell'>Name</TableCell>
            <TableCell className='table-cell'>Roll Number</TableCell>
            <TableCell className='table-cell'>Class</TableCell>
            <TableCell className='table-cell'>Class Teacher</TableCell>
            <TableCell className='table-cell'>GPA</TableCell>
            <TableCell className='table-cell'>Fee Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((student, index) => (
            <TableRow key={index}>
              <TableCell className='table-cell'>{student.name}</TableCell>
              <TableCell className='table-cell'>{student.rollNumber}</TableCell>
              <TableCell className='table-cell'>{student.class}</TableCell>
              <TableCell className='table-cell'>{student.classTeacher}</TableCell>
              <TableCell className='table-cell'>{student.GPA}</TableCell>
              <TableCell className='table-cell'>{student.feeStatus ? 'PAID' : 'NOT PAID'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentsTable;
