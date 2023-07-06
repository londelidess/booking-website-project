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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setCredential("JohnSmith");
    setPassword("secret password");
    await handleSubmit(e);
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
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
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit">Log In</button>
        <button onClick={handleDemoLogin}>Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
// import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import "./LoginForm.css";

// function LoginFormModal() {
//   const dispatch = useDispatch();
//   const [credential, setCredential] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     if (credential.length < 4 || password.length < 6) {
//       setErrors({ credential: "The provided credentials were invalid" });
//       return;
//     }

//     const res = await dispatch(sessionActions.login({ credential, password }));
//     if (res.errors) {
//       setErrors(res.errors);
//     } else {
//       closeModal();
//     }
//   };

//   const handleDemoLogin = async (e) => {
//     e.preventDefault();
//     setCredential("JohnSmith");
//     setPassword("secret password");
//     await handleSubmit(e);
//   };

//   return (
//     <>
//       <h1>Log In</h1>
//     {errors.credential && <p>{errors.credential}</p>}
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username or Email
//           <input
//             type="text"
//             value={credential}
//             onChange={(e) => setCredential(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit" disabled={credential.length < 4 || password.length < 6}>
//           Log In
//         </button>
//         <button onClick={handleDemoLogin}>Demo User</button>
//       </form>
//     </>
//   );
// }

// export default LoginFormModal;
