import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/common/Navigation";
import Header from "./components/common/Header";
import PostPage from "./pages/PostPage";
import PostListPage from "./pages/PostListPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import "./App.scss";

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
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/postlist" element={<PostListPage />} />
        <Route path="/post" element={<PostPage />} />
      </Routes>
    </div>
  );
};

export default App;
