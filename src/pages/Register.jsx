import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
  registerUser(name: $name, email: $email, password: $password)
}`;

const Register = () => {
  const [registerUser] = useMutation(REGISTER_USER);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await registerUser({ variables: { name, email, password } });
      console.log("Server response:", data.registerUser);
      alert("Registration successful!");
      navigate("/login");

  } catch (err) {
    alert('❌ Registration failed: ' + err.message);
  }
};

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group" style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
              color: 'black',
              fontSize: 20
            }}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
