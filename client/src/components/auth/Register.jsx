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
  const [errors, setErrors] = useState([]);

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
          setErrors(user.errors);
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
          invalid={passwordMismatch}
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
          invalid={passwordMismatch}
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
        <FormFeedback>Passwords do not match!</FormFeedback>
      </FormGroup>
      {errors.map((e, i) => (
        <p key={i} style={{ color: "red" }}>
          {e}
        </p>
      ))}
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
