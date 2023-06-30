import React from 'react';

const Greeting = ({ user }) => {
  return (
    <div className="greeting">
      {user ? (
        <>Welcome back, {user.username}!</>
      ) : (
        <>Please log in.</>
      )}
    </div>
  );
}

export default Greeting;
