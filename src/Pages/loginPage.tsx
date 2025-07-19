import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PageStyles/signUpPageCSS.css';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    alert('Login submitted!');
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="signup-btn">Login</button>
      </form>
      <div style={{ marginTop: 16 }}>
        <button
          className="signup-btn"
          style={{ background: 'transparent', color: '#3da175', border: 'none', boxShadow: 'none' }}
          onClick={() => navigate('/signup')}
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
}

export default LoginPage;