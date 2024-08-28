import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentForm = ({ studentToEdit, onSave, onCancel }) => {
  const [student, setStudent] = useState({ name: '', email: '' });

  useEffect(() => {
    if (studentToEdit) {
      setStudent(studentToEdit);
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (student.id) {
      axios.put(`/students/${student.id}`, student)
        .then(() => onSave())
        .catch(error => console.error('Error updating student:', error));
    } else {
      axios.post('/students', student)
        .then(() => onSave())
        .catch(error => console.error('Error creating student:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{student.id ? 'Edit Student' : 'Add Student'}</h2>
      <input
        type="text"
        name="name"
        value={student.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={student.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default StudentForm;
