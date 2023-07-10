import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (credential.length < 4 || password.length < 6) {
      setErrors({ credential: "The provided credentials were invalid" });
      return;
    }

    // return dispatch(sessionActions.login({ credential, password }))
    //   .then(closeModal)
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) {
    //       setErrors(data.errors);
    //     }
    //   });

    try {
      const res = await dispatch(
        sessionActions.login({ credential, password })
      );
      if (res.errors) {
        setErrors(res.errors);
      } else {
        closeModal();
      }
    } catch (err) {
      console.error("Error:", err);
      setErrors({
        credential: err.message || "The provided credentials were invalid",
      });
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const demoUser = {
      credential: "JohnSmith",
      password: "secret password",
    };

    const res = await dispatch(sessionActions.login(demoUser));
    if (!res.errors) {
      setCredential(demoUser.credential);
      setPassword(demoUser.password);
      closeModal();
    } else {
      // If there are errors, handle them here.
      console.error(res.errors);
      setErrors(res.errors);
    }
    // await handleSubmit(e);
  };

  return (
    <div className="login-form-container">
      <h1 className="login-form-title">Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {errors.credential && <p className="error">{errors.credential}</p>}
        <label>
          Username or Email
          <input
            type="text"
            className="login-input"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="login-button"
          disabled={credential.length < 4 || password.length < 6}
        >
          Log In
        </button>
        <button className="demo-login-button" onClick={handleDemoLogin}>
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
