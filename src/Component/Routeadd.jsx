import React, { useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";  // Include Route from react-router-dom
import Login from "./Component/Login";
import Chat from "./Component/Chat";
import PageNotFound from "./Component/PageNotFound";
import Home from "./Component/Home";
import Profile from "./Component/Profile";

function Routeadd() {
  return (
    <div>
       <Routes>
          <Route path= "/" element={<Home></Home>}></Route>
          <Route path= "/login" element={<Login></Login>}></Route>
          <Route path= "/chat/:uniqueID" element={<Chat></Chat>}></Route>
          <Route path= "*" element={<PageNotFound></PageNotFound>}></Route>
       </Routes>

    </div>
  )
}

export default Routeadd