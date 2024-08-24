import React, { useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Home from "./Component/Home";
import Chat from "./Component/Chat";
import PageNotFound from "./Component/PageNotFound";
import User from "./Component/User";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      
      <Routes>
        <Route
          path="/"
          element={
            <Protected loggedIn={loggedIn}>
              <Home setLoggedIn={setLoggedIn} />
            </Protected>
          }
        />
        <Route
          path="/chat/:uniqueID"
          element={
            <Protected loggedIn={loggedIn}>
              <Chat />
            </Protected>
          }
        />
        <Route
          path="/login"
          element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

function Protected({ loggedIn, children }) {
  if (loggedIn) {
    return children; // Render the child components if logged in
  } else {
    return <Navigate to="/login" />; // Redirect to login if not logged in
  }
}

export default App;
