import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import FindIdPage from "./pages/Auth/FindIdPage";
import FindPasswordPage from "./pages/Auth/FindPasswordPage";
import LogInPage from "./pages/Auth/LogInPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import PostLostPage from "./pages/Lost/PostLostPage";
import LostListPage from "./pages/Lost/LostListPage";
import LostDetailPage from "./pages/Lost/LostDetailPage";
import SearchLostPage from "./pages/Lost/SearchLostPage";
import FoundListPage from "./pages/Found/FoundListPage";
import PostFoundPage from "./pages/Found/PostFoundPage";
import FoundDetailPage from "./pages/Found/FoundDetailPage";
import SearchFoundPage from "./pages/Found/SearchFoundPage";
import ChatPage from "./pages/ChatPage";
import KeywordPage from "./pages/KeywordPage";
import NotFound from "./pages/NotFoundPage";

import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/common/MainLayout";

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
