import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import FindIdPage from "./pages/auth/FindIdPage";
import FindPasswordPage from "./pages/auth/FindPasswordPage";
import LogInPage from "./pages/auth/LogInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import PostLostPage from "./pages/lost/PostLostPage";
import LostListPage from "./pages/lost/LostListPage";
import LostDetailPage from "./pages/lost/LostDetailPage";
import SearchLostPage from "./pages/lost/SearchLostPage";
import FoundListPage from "./pages/found/FoundListPage";
import PostFoundPage from "./pages/found/PostFoundPage";
import FoundDetailPage from "./pages/found/FoundDetailPage";
import SearchFoundPage from "./pages/found/SearchFoundPage";
import ChatPage from "./pages/ChatPage";
import KeywordPage from "./pages/KeywordPage";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFoundPage";

import PrivateRoute from "./routes/PrivateRoute";
import MainLayout from "./routes/MainLayout";

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
          <Route path="/" element={<LostListPage />} />
          <Route path="/:postId" element={<LostDetailPage />} />
          <Route path="/found" element={<FoundListPage />} />
          <Route path="/found/search" element={<SearchFoundPage />} />
          <Route path="/search" element={<SearchLostPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/post" element={<PostLostPage />} />
            <Route path="/found/post" element={<PostFoundPage />} />
            <Route path="/found/:postId" element={<FoundDetailPage />} />
            <Route path="/keyword" element={<KeywordPage />} />
            <Route path="/mypage/*" element={<MyPage />} />
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
