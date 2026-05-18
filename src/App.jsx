import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Public from "./components/Public.jsx";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import Welcome from "./features/auth/Welcome.jsx";
import RequireAuth from "./features/auth/RequireAuth.jsx";
import Chatbot from "./features/chat/Chatbot.jsx";
import Home from "./components/Home.jsx";
import Chat from "./components/Chat.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/welcome" element={<Welcome />} />
            {/* <Route path="/chat" element={<Chatbot />} /> */}
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
