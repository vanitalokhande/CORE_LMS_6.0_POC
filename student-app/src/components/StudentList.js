import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/students')
      .then(response => response.json())
      .then(data => setStudents(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/students/${id}`, { method: 'DELETE' })
      .then(() => setStudents(students.filter(student => student.id !== id)));
  };

  return (
    <div>
      <h1>Student List</h1>
      <Link to="/add">Add Student</Link>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} ({student.email})
            <Link to={`/edit/${student.id}`}>Edit</Link>
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
