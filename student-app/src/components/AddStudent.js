import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    })
      .then(() => navigate('/'))
      .catch(err => console.error('Error:', err));
  };

  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
