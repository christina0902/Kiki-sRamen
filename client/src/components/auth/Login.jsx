import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../managers/authManager";
import { FormFeedback, FormGroup, Input } from "reactstrap";
import "./auth.css";

export default function Login({ setLoggedInUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).then((user) => {
      if (!user) {
        setFailedLogin(true);
      } else {
        setLoggedInUser(user);
        navigate("/");
      }
    });
  };

  return (
    <div className="container login-form" style={{ maxWidth: "500px" }}>
      <FormGroup>
        <Input
          invalid={failedLogin}
          type="text"
          value={email}
          placeholder="Email"
          className="form-input"
          onChange={(e) => {
            setFailedLogin(false);
            setEmail(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Input
          invalid={failedLogin}
          type="password"
          value={password}
          placeholder="Password"
          className="form-input"
          onChange={(e) => {
            setFailedLogin(false);
            setPassword(e.target.value);
          }}
        />
        <FormFeedback>Login failed.</FormFeedback>
      </FormGroup>

      <button className="auth-btn" onClick={handleSubmit}>
        Sign In
      </button>
      <p>
        <Link className="register-link" to="/register">
          create account
        </Link>
      </p>
    </div>
  );
}
