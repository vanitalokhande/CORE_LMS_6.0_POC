import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/students/${id}`)
      .then(response => response.json())
      .then(data => {
        setStudent(data);
        setName(data.name);
        setEmail(data.email);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, email })
    })
      .then(() => navigate('/'))
      .catch(err => console.error('Error:', err));
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
