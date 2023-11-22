import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import NotFound from "./pages/NotFound";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
