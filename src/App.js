import { useState } from 'react';
import './App.css';
import validator from 'validator';

function App() {
  const [signUpInput, setSignUpInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    console.log();
    setSignUpInput({
      ...signUpInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!validator.isEmail(signUpInput.email)) {
      return setError('the email you input is invalid.');
    }
  };

  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email-address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={signUpInput.email}
            onChange={handleChange}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={signUpInput.password}
            onChange={handleChange}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="confirm password" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            id="confirm password"
            name="confirmPassword"
            className="form-control"
            value={signUpInput.confirmPassword}
            onChange={handleChange}
          ></input>
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
