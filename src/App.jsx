import React from "react";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import Details from "./Components/Details";
import Catagory from "./Components/Catagory";
import Create from "./Components/Create";
import Update from "./Components/Update";
import Usermode from "./Components/Usermode";
function App() {
  return (
    <div className="h-screen w-screen  flex ">
      <Routes>
        <Route path="/user" element={<Usermode />} />
        <Route path="/" element={<Home />} />
        <Route path="/form/:formName" element={<Create />} />
        <Route path="/edit/:id" element={<Update />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
