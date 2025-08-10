import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ResetPassword.css';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:8000/api/users/password/reset/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMsg(data?.message || 'Check your email');
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {msg && <p style={{ color: 'green' }}>{msg}</p>}

      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Back to <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
