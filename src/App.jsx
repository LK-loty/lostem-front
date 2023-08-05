import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/common/Navigation";
import Header from "./components/common/Header";
import PostPage from "./pages/PostPage";
import OwnerListPage from "./pages/OwnerListPage";
import LostItemListPage from "./pages/LostItemListPage";
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
        <Route path="/" element={<OwnerListPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/lostitemlist" element={<LostItemListPage />} />
      </Routes>
    </div>
  );
};

export default App;
