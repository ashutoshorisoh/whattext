import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';

function Home({ setLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      Home
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
