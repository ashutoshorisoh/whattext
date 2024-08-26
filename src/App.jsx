import { Route, Routes } from "react-router-dom";
import Login from "./Component/Login";
import PageNotFound from "./Component/PageNotFound"
import Home from "./Component/Home";
import ProtectedRoute from "./Component/ProtectedRoute";
import { useState } from "react";
import { DarkModeProvider } from "./Component/DarkModeContext";

function App() {
  // loggdeIn -> information , user data -> CRUD
  return (
    <>
    <DarkModeProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <Home ></Home>
        </ProtectedRoute>}></Route>

      <Route path="/:chatid" element={
          <ProtectedRoute><Home></Home></ProtectedRoute>
        }></Route>

        <Route path="/login" element={<Login ></Login>}></Route>
        <Route path="*" element={< PageNotFound />} />
      </Routes>
      </DarkModeProvider>
    </>
  )
}

export default App

