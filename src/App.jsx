import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/common/Navigation";
import Header from "./components/common/Header";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  const location = useLocation();
  const [showNavandHeader, setShowNavandHeader] = useState(true);

  useEffect(() => {
    setShowNavandHeader(!["/login", "/signup"].includes(location.pathname));
  }, [location]);

  return (
    <div className="App">
      {showNavandHeader && (
        <React.Fragment>
          <Header />
          <Navigation />
        </React.Fragment>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/post" element={<PostPage />} />
      </Routes>
    </div>
  );
};

export default App;
