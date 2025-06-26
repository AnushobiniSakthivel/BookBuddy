import React, { useEffect, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { FaUserCircle, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';

const GET_USER = gql`
  query GetUser($_id: ID!) {
    getUser(_id: $_id) {
      _id
      name
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($_id: ID!, $name: String, $email: String, $password: String) {
    updateUser(_id: $_id, name: $name, email: $email, password: $password) {
      _id
      name
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($_id: ID!) {
    deleteUser(_id: $_id)
  }
`;

const UserProfile = () => {
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const { data, loading, error, refetch } = useQuery(GET_USER, { variables: { _id: userId } });
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const [form, setForm] = useState({ name: userName || '', email: userEmail || '', password: '' });
  const [success, setSuccess] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (data && data.getUser) {
      setForm({ name: data.getUser.name, email: data.getUser.email, password: '' });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setErrMsg('');
    try {
      await updateUser({ variables: { _id: userId, name: form.name, email: form.email, password: form.password || undefined } });
      setSuccess('Profile updated successfully!');
      setForm({ ...form, password: '' });
      localStorage.setItem('userName', form.name);
      localStorage.setItem('userEmail', form.email);
      refetch();
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteUser({ variables: { _id: userId } });
        localStorage.clear();
        window.location.href = '/login';
      } catch (err) {
        setErrMsg(err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="login-container" style={{ maxWidth: 400, margin: '2rem auto', padding: 30, borderRadius: 15, boxShadow: '0 4px 15px rgba(0,0,0,0.2)', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
        <FaUserCircle size={64} style={{ marginBottom: 10, color: '#00b7ff' }} />
        <h2 style={{ margin: 0 }}>Your Profile</h2>
        <div style={{ marginTop: 8, fontWeight: 'bold', color: '#00b7ff', fontSize: 16 }}>
          {form.name}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{form.email}</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="input-group" style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="New Password (leave blank to keep current)"
            value={form.password}
            onChange={handleChange}
            style={{ paddingRight: 40 }}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#00b7ff',
              fontSize: 20
            }}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit" style={{ marginTop: 10 }}>Update Profile</button>
      </form>
      <div style={{ margin: '30px 0 10px', borderTop: '1px solid rgba(255,255,255,0.2)' }}></div>
      <div style={{ textAlign: 'center' }}>
        <button onClick={handleDelete} style={{ background: '#f57070', color: 'white', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 'bold', fontSize: 16, padding: '10px 0' }}>
          <FaTrash style={{ marginRight: 8 }} /> Delete Account
        </button>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>
          This action is <b>irreversible</b>.
        </div>
      </div>
      {success && <div style={{ color: 'lightgreen', marginTop: 15, textAlign: 'center' }}>{success}</div>}
      {errMsg && <div style={{ color: '#ffb3b3', marginTop: 15, textAlign: 'center' }}>{errMsg}</div>}
    </div>
  );
};

export default UserProfile; 