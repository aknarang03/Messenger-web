import React from "react";
import Login from "./Login";
import Register from "./Register";
import Chat from "./Chat";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Messenger</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
