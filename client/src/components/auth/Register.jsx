import { useState } from "react";
import { register } from "../../managers/authManager";
import { Link, useNavigate } from "react-router-dom";
import { FormFeedback, FormGroup, Input } from "reactstrap";

export default function Register({ setLoggedInUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [registrationFail, setRegistrationFail] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      const newUser = {
        firstName,
        lastName,
        userName,
        email,
        password,
        phoneNumber,
      };
      register(newUser).then((user) => {
        if (user.errors) {
          setRegistrationFail(true);
        } else {
          setLoggedInUser(user);
          navigate("/");
        }
      });
    }
  };

  return (
    <div className="container register-form" style={{ maxWidth: "550px" }}>
      <FormGroup className="name-input">
        <Input
          type="text"
          invalid={registrationFail}
          className="form-input block-input"
          placeholder="First Name"
          value={firstName}
          required
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <Input
          type="text"
          placeholder="Last Name"
          className="form-input block-input"
          required
          invalid={registrationFail}
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          required
          invalid={registrationFail}
          className="form-input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          required
          invalid={registrationFail}
          placeholder="Username"
          value={userName}
          className="form-input"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Phone Number"
          type="text"
          required
          invalid={registrationFail}
          className="form-input"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Password"
          invalid={passwordMismatch || registrationFail}
          type="password"
          required
          className="form-input"
          value={password}
          onChange={(e) => {
            setPasswordMismatch(false);
            setPassword(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Input
          invalid={passwordMismatch || registrationFail}
          placeholder="Confirm Password"
          type="password"
          className="form-input"
          required
          value={confirmPassword}
          onChange={(e) => {
            setPasswordMismatch(false);
            setConfirmPassword(e.target.value);
          }}
        />
        {passwordMismatch ? (
          <FormFeedback>Passwords do not match!</FormFeedback>
        ) : (
          <FormFeedback>Login failed</FormFeedback>
        )}
      </FormGroup>
      <button
        color="primary"
        className="auth-btn"
        onClick={handleSubmit}
        disabled={passwordMismatch}
      >
        Register
      </button>
      <p>
        <Link className="register-link" to="/login">
          Already have an account?
        </Link>
      </p>
    </div>
  );
}
