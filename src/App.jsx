import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/common/Navigation";
import Header from "./components/common/Header";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import NotFound from "./pages/NotFound";

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
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
