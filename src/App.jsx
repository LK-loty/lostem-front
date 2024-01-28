import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import FindItemPage from "./pages/FindItemPage";
import FindOwnerPage from "./pages/FindOwnerPage";
import FindItemPostPage from "./pages/PostPage/FindItemPostPage";
import FindOwnerPostPage from "./pages/PostPage/FindOwnerPostPage";
import LostDetailPage from "./pages/PostDetailPage/LostDetailPage";
import FoundDetailPage from "./pages/PostDetailPage/FoundDetailPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import FindIdPage from "./pages/FindIdPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/common/MainLayout";
import "./styles/main.scss";

axios.defaults.baseURL = "http://localhost:8080/";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/findid" element={<FindIdPage />} />
        <Route path="/findpassword" element={<FindPasswordPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<FindItemPage />} />
          <Route path="/:postId" element={<LostDetailPage />} />
          <Route path="/findowner" element={<FindOwnerPage />} />
        </Route>
        {/* 로그인 해야 접근 가능한 페이지 */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/post" element={<FindItemPostPage />} />
            <Route path="/findowner/post" element={<FindOwnerPostPage />} />
            <Route path="/findowner/:postId" element={<FoundDetailPage />} />
          </Route>
          <Route path="/chat" element={<ChatPage />}>
            <Route path=":roomId" element={<ChatPage />} />
          </Route>
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
