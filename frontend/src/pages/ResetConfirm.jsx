// src/pages/ResetConfirm.jsx
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/ResetConfirm.css';

export default function ResetConfirm() {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/users/password/reset/confirm/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, token, new_password: newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(data?.message || 'Password reset successful. Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMsg(data?.message || 'Failed to reset password.');
      }
    } catch (err) {
      console.error(err);
      setMsg('An error occurred. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <h2>Set a new password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Set New Password'}</button>
      </form>
      {msg && <p style={{ marginTop: '1rem' }}>{msg}</p>}
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Back to <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
