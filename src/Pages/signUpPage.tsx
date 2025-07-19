import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PageStyles/signUpPageCSS.css';

function SignUpPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    alert('Signup submitted!');
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
      <div style={{ marginTop: 16 }}>
        <button
          className="signup-btn"
          style={{ background: 'transparent', color: '#3da175', border: 'none', boxShadow: 'none' }}
          onClick={() => navigate('/login')}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;