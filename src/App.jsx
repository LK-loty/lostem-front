import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import FindItemPage from "./pages/FindItemPage";
import PostPage from "./pages/PostPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import FindIdPage from "./pages/FindIdPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import "./styles/main.scss";

axios.defaults.baseURL = "http://localhost:8080/";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FindItemPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="findid" element={<FindIdPage />} />
        <Route path="/findpassword" element={<FindPasswordPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* 로그인 해야 접근 가능한 페이지 */}
        <Route element={<PrivateRoute />}>
          <Route path="/post" element={<PostPage />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
