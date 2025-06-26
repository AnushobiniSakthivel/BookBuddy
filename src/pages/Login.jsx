import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      name
      email
    }
  }
`;

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { email, password }
      });

      if (data && data.loginUser && data.loginUser._id) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', data.loginUser._id);
        localStorage.setItem('userName', data.loginUser.name);
        localStorage.setItem('userEmail', data.loginUser.email);
        window.dispatchEvent(new Event("storage")); 
        setIsLoggedIn(true); 
        alert(`✅ Welcome back, ${data.loginUser.name}!`);
        navigate('/home');
      } else {
        alert("❌ Login failed.");
      }
    } catch (err) {
      alert("❌ Login failed: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
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
        <button type="submit">Login</button>
        <p> Don't have an account? <a href="/register">REGISTER</a> </p>
      </form>
    </div>
  );
};

export default Login;