import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const SUBMIT_MESSAGE = gql
  `mutation SubmitMessage($name: String!, $email: String!, $message: String!) {
  submitMessage(name: $name, email: $email, message: $message)
}`;

const Contact = () => {
  const [submitMessage] = useMutation(SUBMIT_MESSAGE);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await submitMessage({ variables: { name, email, message } });
    alert("✅ Message sent successfully!");
    setName('');
    setEmail('');
    setMessage('');
  } catch (err) {
    alert("❌ Failed to send message: " + err.message);
  }
};

  return (
    <div className="login-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;