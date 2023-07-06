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
        setErrors({ credential: "The provided credentials were invalid" });
      } else {
        closeModal();
      }
    } catch (err) {
      console.error("Error:", err);
      setErrors({ credential: "The provided credentials were invalid" });
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setCredential("JohnSmith");
    setPassword("secret password");
    await dispatch(sessionActions.login({ credential, password }));
    await closeModal();
    // await handleSubmit(e);
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {errors.credential && <p>{errors.credential}</p>}
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          disabled={credential.length < 4 || password.length < 6}
        >
          Log In
        </button>
        <button onClick={handleDemoLogin}>Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
